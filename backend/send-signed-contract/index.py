import json
import os
import urllib.request
import urllib.parse
import base64
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Отправляет подписанный PDF-договор в Telegram бот
    Args: event - HTTP запрос с PDF в base64 и данными клиента
          context - контекст выполнения функции
    Returns: HTTP ответ с результатом отправки
    '''
    print(f"=== INCOMING SIGNED CONTRACT REQUEST ===")
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
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    pdf_base64 = body_data.get('pdf_base64', '')
    client_name = body_data.get('client_name', '')
    client_phone = body_data.get('client_phone', '')
    client_address = body_data.get('client_address', '')
    
    if not pdf_base64 or not client_name:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')
    
    print(f"Bot token exists: {bool(bot_token)}")
    print(f"Chat ID: {chat_id}")
    
    if not bot_token or not chat_id:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Bot configuration missing'}),
            'isBase64Encoded': False
        }
    
    try:
        pdf_bytes = base64.b64decode(pdf_base64)
        print(f"PDF size: {len(pdf_bytes)} bytes")
    except Exception as e:
        print(f"Error decoding PDF: {str(e)}")
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid PDF data'}),
            'isBase64Encoded': False
        }
    
    caption = f"📄 Подписанный договор\n\n👤 {client_name}\n📞 {client_phone}\n📍 {client_address}"
    
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendDocument"
    
    body_parts = []
    body_parts.append(f'--{boundary}'.encode())
    body_parts.append(b'Content-Disposition: form-data; name="chat_id"\r\n\r\n')
    body_parts.append(chat_id.encode())
    body_parts.append(b'\r\n')
    
    body_parts.append(f'--{boundary}'.encode())
    body_parts.append(b'Content-Disposition: form-data; name="caption"\r\n\r\n')
    body_parts.append(caption.encode('utf-8'))
    body_parts.append(b'\r\n')
    
    filename = f"contract_{client_name.replace(' ', '_')}.pdf"
    body_parts.append(f'--{boundary}'.encode())
    body_parts.append(f'Content-Disposition: form-data; name="document"; filename="{filename}"\r\n'.encode())
    body_parts.append(b'Content-Type: application/pdf\r\n\r\n')
    body_parts.append(pdf_bytes)
    body_parts.append(b'\r\n')
    
    body_parts.append(f'--{boundary}--'.encode())
    
    body = b'\r\n'.join(body_parts)
    
    req = urllib.request.Request(
        telegram_url,
        data=body,
        headers={
            'Content-Type': f'multipart/form-data; boundary={boundary}',
            'Content-Length': str(len(body))
        },
        method='POST'
    )
    
    try:
        print("Sending document to Telegram...")
        with urllib.request.urlopen(req, timeout=30) as response:
            result = json.loads(response.read().decode('utf-8'))
            print(f"Telegram response: {json.dumps(result)}")
            
            if result.get('ok'):
                print("SUCCESS: Document sent!")
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'success': True, 'message': 'Contract sent'}),
                    'isBase64Encoded': False
                }
            else:
                print(f"ERROR: Telegram API error: {result}")
                return {
                    'statusCode': 500,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Telegram API error', 'details': result}),
                    'isBase64Encoded': False
                }
    except Exception as e:
        print(f"EXCEPTION: {str(e)}")
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
