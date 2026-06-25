import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Отправляет уведомление о новой заявке в Telegram
    Args: event - HTTP запрос с данными формы (name, phone, address, tariff)
    Returns: HTTP ответ с результатом отправки
    """
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body_data = json.loads(event.get('body', '{}'))

    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    address = body_data.get('address', '')
    tariff = body_data.get('tariff', '')
    telegram = body_data.get('telegram', '')
    support_message = body_data.get('message', '')

    if not name or not phone or not address:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing required fields'})
        }

    # Сохраняем в БД если это не служба поддержки и не тест
    if tariff and tariff != 'Служба поддержки' and 'ТЕСТ' not in tariff:
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
            print("Order saved to database")

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Telegram not configured'})
        }

    if tariff == 'Служба поддержки':
        message = f"🆘 Обращение в службу поддержки!\n\n👤 Имя: {name}\n📞 Телефон: {phone}\n📍 Адрес: {address}\n💬 Сообщение: {support_message}"
    else:
        message = f"🔔 Новая заявка!\n\n👤 Имя: {name}\n📞 Телефон: {phone}\n📍 Адрес: {address}\n💳 Тариф: {tariff}"

    if telegram:
        message += f"\n📱 Telegram: {telegram}"

    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message
    }).encode('utf-8')

    req = urllib.request.Request(
        f"https://api.telegram.org/bot{bot_token}/sendMessage",
        data=data,
        method='POST'
    )

    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))

    if result.get('ok'):
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True})
        }
    else:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Telegram API error', 'details': result})
        }
