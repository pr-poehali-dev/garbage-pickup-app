import json
import os
import urllib.request
import urllib.parse
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправляет уведомление о новой заявке на договор в Telegram бот
    Args: event - HTTP запрос с данными формы (name, phone, address, tariff)
          context - контекст выполнения функции
    Returns: HTTP ответ с результатом отправки
    '''
    method: str = event.get('httpMethod', 'POST')
    
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
    
    if not name or not phone or not address:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': 'Missing required fields'})
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    
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
    
    get_chat_url = f"https://api.telegram.org/bot{bot_token}/getUpdates"
    chat_id = None
    
    try:
        print(f"Fetching updates from: {get_chat_url}")
        with urllib.request.urlopen(get_chat_url) as response:
            updates = json.loads(response.read().decode('utf-8'))
            print(f"Updates response: {json.dumps(updates)}")
            if updates.get('ok') and len(updates.get('result', [])) > 0:
                for update in reversed(updates['result']):
                    if 'message' in update and 'chat' in update['message']:
                        chat_id = str(update['message']['chat']['id'])
                        print(f"Found chat_id: {chat_id}")
                        break
    except Exception as e:
        print(f"ERROR getting updates: {str(e)}")
        pass
    
    if not chat_id:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': 'Could not find chat ID. Please send /start to the bot first.',
                'bot_username': 'Check your bot username from @BotFather'
            })
        }
    
    message = f"""🔔 Новая заявка на договор!

👤 Имя: {name}
📞 Телефон: {phone}
📍 Адрес: {address}
💳 Тариф: {tariff}"""
    
    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message
    }).encode('utf-8')
    
    req = urllib.request.Request(telegram_url, data=data, method='POST')
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode('utf-8'))
            
            if result.get('ok'):
                return {
                    'statusCode': 200,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'success': True, 'message': 'Notification sent'})
                }
            else:
                return {
                    'statusCode': 500,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'error': 'Telegram API error', 'details': result})
                }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)})
        }