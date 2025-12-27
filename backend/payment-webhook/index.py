import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Обрабатывает webhook от платёжной системы и отправляет уведомление клиенту в Telegram
    Args: event - HTTP запрос с данными о платеже
          context - контекст выполнения функции
    Returns: HTTP ответ с результатом обработки
    '''
    print(f"=== PAYMENT WEBHOOK RECEIVED ===")
    print(f"Event: {json.dumps(event)}")
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    # Получаем данные платежа (адаптируйте под вашу платёжную систему)
    # Примеры полей: для ЮКасса - object.metadata.telegram
    # Для универсальности ищем telegram в разных местах
    telegram = None
    payment_id = body_data.get('payment_id') or body_data.get('object', {}).get('id')
    
    # Пробуем найти telegram разными способами
    if 'telegram' in body_data:
        telegram = body_data.get('telegram')
    elif 'object' in body_data and 'metadata' in body_data['object']:
        telegram = body_data['object']['metadata'].get('telegram')
    
    print(f"Payment ID: {payment_id}, Telegram: {telegram}")
    
    if not telegram:
        print("WARNING: No telegram found in webhook data")
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'No telegram identifier found'})
        }
    
    # Обновляем статус заказа в БД
    try:
        db_url = os.environ.get('DATABASE_URL')
        if not db_url:
            print("ERROR: DATABASE_URL not configured")
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Database not configured'})
            }
        
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        # Обновляем статус оплаты
        cur.execute(
            "UPDATE orders SET payment_status = %s, updated_at = CURRENT_TIMESTAMP WHERE telegram = %s",
            ('paid', telegram)
        )
        
        # Получаем данные клиента
        cur.execute(
            "SELECT name, phone, address, tariff FROM orders WHERE telegram = %s ORDER BY created_at DESC LIMIT 1",
            (telegram,)
        )
        
        result = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        if not result:
            print(f"WARNING: No order found for telegram: {telegram}")
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'error': 'Order not found'})
            }
        
        name, phone, address, tariff = result
        print(f"Order found: {name}, {phone}, {tariff}")
        
    except Exception as e:
        print(f"Database error: {e}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Database error: {str(e)}'})
        }
    
    # Отправляем уведомление клиенту через бота
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    
    if not bot_token:
        print("ERROR: TELEGRAM_BOT_TOKEN not configured")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Bot token not configured'})
        }
    
    # Формируем chat_id из telegram username или используем как есть
    # Если это @username, бот должен был получить сообщение от пользователя ранее
    # Если это номер телефона или chat_id - используем напрямую
    
    message = f"""✅ Оплата получена!

Здравствуйте, {name}!

Ваша оплата успешно обработана.
📦 Тариф: {tariff}
📍 Адрес: {address}

Мы скоро свяжемся с вами для уточнения деталей.
Спасибо, что выбрали нас! 🙏"""
    
    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    # Пробуем отправить как chat_id (если это число) или как username
    data = urllib.parse.urlencode({
        'chat_id': telegram,
        'text': message
    }).encode('utf-8')
    
    req = urllib.request.Request(telegram_url, data=data, method='POST')
    
    try:
        print(f"Sending notification to {telegram}...")
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"Telegram API response: {json.dumps(result)}")
            
            if result.get('ok'):
                print("SUCCESS: Payment notification sent!")
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'message': 'Payment notification sent'})
                }
            else:
                print(f"ERROR: Telegram API error: {result}")
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Failed to send notification', 'details': result})
                }
    except Exception as e:
        print(f"EXCEPTION: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }
