import json
import os
import urllib.request
import base64
import psycopg2
from typing import Dict, Any

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
}

def save_to_db(client_name, client_phone, client_address, contract_text, signature_base64, client_ip):
    """Сохраняет подписанный договор в базу данных"""
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO signed_contracts (client_name, client_phone, client_address, contract_text, signature_base64, client_ip) "
        "VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (client_name, client_phone, client_address, contract_text, signature_base64, client_ip)
    )
    contract_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return contract_id

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """Отправляет подписанный договор в Telegram и сохраняет в базу данных"""
    method = event.get('httpMethod', 'POST')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', **CORS_HEADERS},
            'body': json.dumps({'error': 'Method not allowed'})
        }

    body_data = json.loads(event.get('body', '{}'))

    client_name = body_data.get('client_name', '')
    client_phone = body_data.get('client_phone', '')
    client_address = body_data.get('client_address', '')
    contract_text = body_data.get('contract_text', '')
    signature_base64 = body_data.get('pdf_base64', '')

    if not client_name or not signature_base64:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', **CORS_HEADERS},
            'body': json.dumps({'error': 'Missing required fields'})
        }

    client_ip = ''
    request_context = event.get('requestContext', {})
    if request_context:
        identity = request_context.get('identity', {})
        if identity:
            client_ip = identity.get('sourceIp', '')

    contract_id = save_to_db(client_name, client_phone, client_address, contract_text, signature_base64, client_ip)

    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
    chat_id = os.environ.get('TELEGRAM_CHAT_ID')

    if not bot_token or not chat_id:
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', **CORS_HEADERS},
            'body': json.dumps({'success': True, 'message': 'Contract saved', 'contract_id': contract_id})
        }

    caption = f"📝 Договор #{contract_id}\n\n👤 {client_name}\n📞 {client_phone}\n📍 {client_address}\n\n{contract_text}"

    if len(caption) > 1024:
        caption = caption[:1020] + '...'

    signature_bytes = base64.b64decode(signature_base64)

    boundary = '----FormBoundary7MA4YWxk'
    parts = []

    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="chat_id"\r\n\r\n{chat_id}'.encode())
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="caption"\r\n\r\n{caption}'.encode('utf-8'))
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="photo"; filename="signature_{client_name.replace(" ", "_")}.png"\r\nContent-Type: image/png\r\n\r\n'.encode() + signature_bytes)
    parts.append(f'--{boundary}--\r\n'.encode())

    body = b'\r\n'.join(parts)

    req = urllib.request.Request(
        f"https://api.telegram.org/bot{bot_token}/sendPhoto",
        data=body,
        headers={'Content-Type': f'multipart/form-data; boundary={boundary}'},
        method='POST'
    )

    with urllib.request.urlopen(req, timeout=30) as response:
        result = json.loads(response.read().decode('utf-8'))

        if result.get('ok'):
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', **CORS_HEADERS},
                'body': json.dumps({'success': True, 'message': 'Contract sent and saved', 'contract_id': contract_id})
            }

        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', **CORS_HEADERS},
            'body': json.dumps({'success': True, 'message': 'Contract saved, Telegram notification failed', 'contract_id': contract_id})
        }
