from flask import Flask, request, jsonify
# import generate_learning_content 
from tt import

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    user_data = request.json
    content = generate_learning_content(user_data)
    return jsonify({'content': content})

if __name__ == '__main__':
    app.run(debug=True)
