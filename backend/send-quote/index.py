import json
import os
import smtplib
import ssl
from email.mime.text import MIMEText
from email.utils import formataddr

import psycopg2

RECIPIENT = 'antooan72@gmail.com'

SMTP_HOSTS = {
    'gmail.com': ('smtp.gmail.com', 465),
    'yandex.ru': ('smtp.yandex.ru', 465),
    'ya.ru': ('smtp.yandex.ru', 465),
    'mail.ru': ('smtp.mail.ru', 465),
    'bk.ru': ('smtp.mail.ru', 465),
    'inbox.ru': ('smtp.mail.ru', 465),
    'list.ru': ('smtp.mail.ru', 465),
    'outlook.com': ('smtp.office365.com', 587),
    'hotmail.com': ('smtp.office365.com', 587),
}

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}


def esc(value: str) -> str:
    return (value or '').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def build_html(data: dict) -> str:
    rows = [
        ('Name', data.get('name', '')),
        ('Company', data.get('company', '')),
        ('E-mail', data.get('email', '')),
        ('Project country', data.get('country', '')),
        ('Project size', data.get('size', '')),
        ('Residents', data.get('people', '')),
        ('Message', data.get('message', '') or '—'),
    ]
    body = ''.join(
        f'<tr><td style="padding:8px 16px 8px 0;color:#6b7280;font-size:13px;'
        f'white-space:nowrap;vertical-align:top">{esc(label)}</td>'
        f'<td style="padding:8px 0;color:#111827;font-size:14px">{esc(str(value))}</td></tr>'
        for label, value in rows
    )
    return (
        '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">'
        '<h2 style="margin:0 0 4px;font-size:20px;color:#0A1826">New quote request</h2>'
        '<p style="margin:0 0 20px;font-size:13px;color:#6b7280">Living Campus website</p>'
        f'<table style="border-collapse:collapse;width:100%">{body}</table>'
        '</div>'
    )


def handler(event: dict, context) -> dict:
    """Принимает заявку с формы сайта, сохраняет в базу и отправляет уведомление на почту владельца."""
    method = event.get('httpMethod', 'GET')

    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': CORS,
            'body': json.dumps({'error': 'Method not allowed'}),
        }

    data = json.loads(event.get('body') or '{}')

    name = (data.get('name') or '').strip()
    email = (data.get('email') or '').strip()

    if len(name) < 2 or '@' not in email:
        return {
            'statusCode': 400,
            'headers': CORS,
            'body': json.dumps({'error': 'Name and valid e-mail are required'}),
        }

    fields = {
        'name': name[:200],
        'company': (data.get('company') or '').strip()[:200],
        'email': email[:200],
        'country': (data.get('country') or '').strip()[:200],
        'size': (data.get('size') or '').strip()[:100],
        'people': (data.get('people') or '').strip()[:100],
        'message': (data.get('message') or '').strip()[:4000],
    }

    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    email_sent = False
    if smtp_user and smtp_password:
        domain = smtp_user.split('@')[-1].lower()
        host, port = SMTP_HOSTS.get(domain, ('smtp.gmail.com', 465))

        msg = MIMEText(build_html(fields), 'html', 'utf-8')
        msg['Subject'] = f"New quote request — {fields['company'] or fields['name']}"
        msg['From'] = formataddr(('Living Campus', smtp_user))
        msg['To'] = RECIPIENT
        msg['Reply-To'] = fields['email']

        context_ssl = ssl.create_default_context()
        if port == 465:
            with smtplib.SMTP_SSL(host, port, context=context_ssl, timeout=20) as server:
                server.login(smtp_user, smtp_password)
                server.sendmail(smtp_user, [RECIPIENT], msg.as_string())
        else:
            with smtplib.SMTP(host, port, timeout=20) as server:
                server.starttls(context=context_ssl)
                server.login(smtp_user, smtp_password)
                server.sendmail(smtp_user, [RECIPIENT], msg.as_string())
        email_sent = True

    dsn = os.environ.get('DATABASE_URL')
    if dsn:
        conn = psycopg2.connect(dsn)
        try:
            with conn.cursor() as cur:
                values = ', '.join(
                    "'" + str(v).replace("'", "''") + "'"
                    for v in [
                        fields['name'],
                        fields['company'],
                        fields['email'],
                        fields['country'],
                        fields['size'],
                        fields['people'],
                        fields['message'],
                    ]
                )
                cur.execute(
                    'INSERT INTO quote_requests '
                    '(name, company, email, country, project_size, residents, message, email_sent) '
                    f'VALUES ({values}, {str(email_sent).upper()})'
                )
            conn.commit()
        finally:
            conn.close()

    return {
        'statusCode': 200,
        'headers': CORS,
        'body': json.dumps({'success': True, 'emailSent': email_sent}),
    }
