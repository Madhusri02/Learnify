
from flask import g
from flask_mysqldb import MySQL

class Config:
    Host = 'localhost'
    User = 'root'
    Password = 'root@1234'
    DB = 'sample'

mysql = MySQL()

def init_db(app):
    app.config['MYSQL_HOST'] = Config.Host
    app.config['MYSQL_USER'] = Config.User
    app.config['MYSQL_PASSWORD'] = Config.Password
    app.config['MYSQL_DB'] = Config.DB
    mysql.init_app(app)

def get_db():
    if 'db' not in g:
        g.db = mysql.connection
    return g.db

def close_db():
    db = g.pop('db', None)
    if db is not None:
        db.close()
