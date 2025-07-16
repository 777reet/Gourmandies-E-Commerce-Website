from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import os
from datetime import datetime
import sqlite3
import re

app = Flask(__name__, static_folder='../Pages', static_url_path='')
CORS(app)

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('MAIL_USERNAME')

mail = Mail(app)

# Database setup
def init_db():
    conn = sqlite3.connect('contacts.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

def validate_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def save_contact(name, email, message):
    try:
        conn = sqlite3.connect('contacts.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)', 
                      (name, email, message))
        conn.commit()
        conn.close()
        return True
    except:
        return False

def send_email(name, email, message):
    try:
        msg = Message(
            subject=f"New Contact: {name}",
            recipients=['your-email@gmail.com'],
            body=f"Name: {name}\nEmail: {email}\nMessage: {message}"
        )
        mail.send(msg)
        return True
    except:
        return False

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return app.send_static_file(filename)

@app.route('/contact', methods=['POST'])
def handle_contact():
    data = request.get_json()
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    message = data.get('message', '').strip()
    
    # Validation
    if not name or len(name) < 2:
        return jsonify({'error': 'Name required (min 2 chars)'}), 400
    
    if not email or not validate_email(email):
        return jsonify({'error': 'Valid email required'}), 400
    
    if not message or len(message) < 10:
        return jsonify({'error': 'Message required (min 10 chars)'}), 400
    
    # Save to database
    if not save_contact(name, email, message):
        return jsonify({'error': 'Database error'}), 500
    
    # Send email
    send_email(name, email, message)
    
    return jsonify({'success': True, 'message': 'Contact saved successfully'})

@app.route('/contacts', methods=['GET'])
def get_contacts():
    conn = sqlite3.connect('contacts.db')
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM contacts ORDER BY timestamp DESC')
    contacts = cursor.fetchall()
    conn.close()
    
    result = []
    for contact in contacts:
        result.append({
            'id': contact[0],
            'name': contact[1],
            'email': contact[2],
            'message': contact[3],
            'timestamp': contact[4]
        })
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)