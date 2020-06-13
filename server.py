from flask import Flask
import jwt
from flask import request
from flask_mysqldb import MySQL
import json
import time
from flask_cors import CORS


app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Prisha101@'
app.config['MYSQL_DB'] = 'POS'

mysql = MySQL(app)
CORS(app)

@app.route('/')
def home():
    return 'home'

@app.route('/create/user_table')
def user_table():
    cur = mysql.connection.cursor()

    cur.execute('''CREATE TABLE user(id int NOT NULL AUTO_INCREMENT, username VARCHAR(255), address VARCHAR(255), contact VARCHAR(10), email VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id));''')
    mysql.connection.commit()
    cur.close()
    
    return 'User Table added'

# Registeration for a new user
@app.route("/user/register", methods = ["POST"])
def create():
    username = request.json["uname"]
    address = request.json["address"]    
    contact = request.json["contact"]    
    email = request.json["email"]
    password = request.json["password"]       
    
    cur = mysql.connection.cursor()

    cur.execute('''INSERT INTO user(username,address,contact,email,password) VALUES ("%s","%s","%s","%s","%s");'''%(username,address,contact,email,password))
    mysql.connection.commit()
    cur.close()

    return json.dumps({"user_added": True, "message": "registeration successful"})    


# login of existing users
@app.route('/user/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM user WHERE email = "%s" AND password = "%s";'''%(email,password))
    result = cur.fetchall()
    
    flag = False 
    isAdmin = False
    for row in result:
        if row[4] == email and row[5] == password:
            flag = True
            if row[4] == 'smullalkar@gmail.com' and row[5] == 'pass123':
                isAdmin = True
            else:
                isAdmin = False
            break
                
    if flag == True:
        payload = {'email': email, 'isadmin': isAdmin, 'message': 'logged_in'}
        key = 'secret'
        encode_jwt = jwt.encode(payload, key)
        return {'auth_token': encode_jwt.decode(), 'message': 'logged_in'}
    else:
        return {'message': 'username or password incorrect'}
    


@app.route('/auth_check', methods=['POST'])
def auth_check():
    auth_token = request.json['auth_token']

    key = 'secret'
    data = jwt.decode(auth_token, key)

    return json.dumps(data)
