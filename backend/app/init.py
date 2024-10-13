from flask import Flask , render_template , request 
from flask_mysqldb import MySQL

def create_app():
    app = Flask(__name__)

    with app.app_context():
        init_db()

    return app