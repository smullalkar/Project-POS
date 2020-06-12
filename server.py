from flask import Flask
import jwt
from flask import request
from flask_mysqldb import MySQL
import json
import time

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Prisha101@'
app.config['MYSQL_DB'] = 'employeedata'

mysql = MySQL(app)

@app.route('/')
def home():
    return 'home'

