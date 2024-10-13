from flask import Flask, request, jsonify
from app.db import get_db, close_db

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    db = get_db()
    cur = db.cursor()
    cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
    db.commit()
    
    cur.close()
    close_db()
    
    return jsonify({'message': 'User registered successfully!'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s AND password = %s", (username, password))
    user = cur.fetchone()
    
    cur.close()
    close_db()

    if user:
        return jsonify({'message': 'Login successful!'}), 200
    else:
        return jsonify({'message': 'Invalid credentials!'}), 401

@app.route('/get_users', methods=['GET'])
def get_users():
    db = get_db()
    cur = db.cursor()
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    
    cur.close()
    close_db()

    return jsonify({'users': users})

@app.route('/generate_material', methods=['POST'])
def generate_material():
    data = request.json
    subject = data.get('subject')
    generated_content = f"Generated reading material for {subject}"
    
    return jsonify({'content': generated_content})

@app.route('/assessments', methods=['GET'])
def assessments():
    user_id = request.args.get('user_id')
    db = get_db()
    cur = db.cursor()
    
    cur.execute("SELECT subject, skill_level FROM users WHERE id = %s", (user_id,))
    user_data = cur.fetchone()
    
    cur.close()
    close_db()

    if user_data:
        questions = generate_assessment_questions({'subject': user_data[0], 'skill_level': user_data[1]})
        return jsonify({'flashcards': questions})
    else:
        return jsonify({'message': 'User not found!'}), 404
