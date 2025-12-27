import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправляет уведомление о новой заявке на договор в Telegram бот
    Args: event - HTTP запрос с данными формы (name, phone, address, tariff)
          context - контекст выполнения функции
    Returns: HTTP ответ с результатом отправки
    '''
    print(f"=== INCOMING REQUEST ===")
    print(f"Event: {json.dumps(event)}")
    method: str = event.get('httpMethod', 'POST')
    print(f"Method: {method}")
    
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
    
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    address = body_data.get('address', '')
    tariff = body_data.get('tariff', 'Месяц — 650 ₽/месяц')
    support_message = body_data.get('message', '')
    telegram = body_data.get('telegram', '')
    
    if not name or not phone or not address:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    # Сохраняем заказ в БД (если это не служба поддержки)
    if tariff != 'Служба поддержки':
        try:
            db_url = os.environ.get('DATABASE_URL')
            if db_url:
                conn = psycopg2.connect(db_url)
                cur = conn.cursor()
                cur.execute(
                    "INSERT INTO orders (name, phone, address, telegram, tariff, payment_status) VALUES (%s, %s, %s, %s, %s, %s)",
                    (name, phone, address, telegram, tariff, 'pending')
                )
                conn.commit()
                cur.close()
                conn.close()
                print(f"Order saved to database")
        except Exception as e:
            print(f"Error saving to database: {e}")
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    print(f"Bot token exists: {bool(bot_token)}")
    print(f"Chat ID exists: {bool(chat_id)}")
    print(f"Chat ID value: {chat_id}")
    
    if not bot_token:
        print("ERROR: TELEGRAM_BOT_TOKEN not found in environment")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Bot token not configured'})
        }
    
    if not chat_id:
        print("ERROR: TELEGRAM_CHAT_ID not found in environment")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Chat ID not configured'})
        }
    
    if tariff == 'Служба поддержки':
        message = f"""🆘 Обращение в службу поддержки!

👤 Имя: {name}
📞 Телефон: {phone}
📍 Адрес: {address}
💬 Сообщение: {support_message}"""
        if telegram:
            message += f"\n📱 Telegram: {telegram}"
    else:
        message = f"""🔔 Новая заявка на заказ!

👤 Имя: {name}
📞 Телефон: {phone}
📍 Адрес: {address}
💳 Тариф: {tariff}"""
        if telegram:
            message += f"\n📱 Telegram: {telegram}"
    
    print(f"Preparing to send message to chat_id: {chat_id}")
    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message
    }).encode('utf-8')
    
    req = urllib.request.Request(telegram_url, data=data, method='POST')
    
    try:
        print(f"Sending request to Telegram API...")
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"Telegram API response: {json.dumps(result)}")
            
            if result.get('ok'):
                print("SUCCESS: Message sent to Telegram!")
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'message': 'Notification sent'})
                }
            else:
                print(f"ERROR: Telegram API returned error: {result}")
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Telegram API error', 'details': result})
                }
    except Exception as e:
        print(f"EXCEPTION while sending to Telegram: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }