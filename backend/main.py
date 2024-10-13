from flask import Flask
from app.db import init_db
from app.routes import *

app = Flask(__name__)

init_db(app)

if __name__ == '__main__':
    app.run(debug=True)
