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

# @app.route('/users/listing')
# def userList():
#     csv_file = open('data/users.csv', 'r')
#     csvreader = csv.DictReader(csv_file)

#     rows = []
#     for row in csvreader:
#         rows.append(row)
#     print(rows)

#     csv_file.close()
#     return json.dumps(rows)

@app.route('/user/inventory/<email>')
def user_inventory(email):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT u.username,u.address,s.item_name,s.price_per_unit_purchased,s.price_per_unit_selling,s.qty,s.tax FROM user as u JOIN stock as s ON u.id = s.user_id WHERE u.email = "%s";'''%(email))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    return json.dumps(data)

@app.route('/user/customer/<email>')
def user_customers(email):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT u.username, b.amount, b.created_at, c.name, c.contact FROM user as u JOIN bill as b ON u.id = b.user_id JOIN customer as c ON b.customer_id = c.id WHERE u.email = "%s";'''%(email))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    return json.dumps(data, default=str)

@app.route('/user/supplier')
def user_supplier():
    cur = mysql.connection.cursor()
    cur.execute('''SELECT * FROM supplier;''')
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    return json.dumps(data)

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

# @app.route('/users/show/<id>')
# def show(id):
#     target = id
#     csv_file = open('data/users.csv','r')
#     csvreader = csv.DictReader(csv_file)
    
#     user_data = []
    
#     for row in csvreader:
#         if row['id'] == target:
#             user_data.append(row)
            
#     return json.dumps(user_data)

# @app.route('/users/edit/<id>', methods=['POST'])
# def edit(id):    
    
#     name = request.json["name"]
#     email = request.json["email"]
#     mobile = request.json["mobile"]
#     age = request.json["age"]    
#     password = request.json["password"]    
#     role = request.json["role"]    
#     username = request.json["username"]    
#     data = {
#         "id": id,
#         "name": name,
#         "email": email,
#         "mobile": mobile,
#         "age": age,
#         "password": password,
#         "role": role,
#         "username": username,
#     }
    
#     csv_file = open('data/users.csv','r')
#     csvreader = csv.DictReader(csv_file)     
    
#     target = id   
#     new_data = []    
       
#     for i in csvreader:
#         if id == i['id']:
#             new_data.append(data)
#         else:
#             new_data.append(i)
#     csv_file.close() 
       
#     csv_file = open("data/users.csv", "w")    
#     header = new_data[0].keys()    
#     write_data = csv.DictWriter(csv_file, fieldnames=header)    
#     write_data.writeheader()
#     write_data.writerows(new_data)    
#     csv_file.close()    
#     return json.dumps(new_data)

# @app.route('/users/delete/<id>', methods=['POST'])
# def delete(id):
#     target = id    
#     new_data = []    
#     csv_file = open("data/users.csv", "r")    
#     csvreader = csv.DictReader(csv_file)    
#     for i in csvreader:
#         if i['id'] == id:
#             pass
#         else:
#             new_data.append(i)
#     csv_file.close() 
       
#     csv_file = open("data/users.csv", "w")    
#     header = new_data[0].keys()   
#     write_data = csv.DictWriter(csv_file, fieldnames=header)    
#     write_data.writeheader()
#     write_data.writerows(new_data)   
#     csv_file.close()    
#     return json.dumps({"data": str(new_data), "response":"user successfully deleted"})

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
        payload = {'email': email, 'isadmin': isAdmin, 'message': True}
        key = 'secret'
        encode_jwt = jwt.encode(payload, key)
        return {'auth_token': encode_jwt.decode(), 'message': True}
    else:
        return {'message': 'username or password incorrect'}
    


@app.route('/auth_check', methods=['POST'])
def auth_check():
    auth_token = request.json['auth_token']

    key = 'secret'
    data = jwt.decode(auth_token, key)

    return json.dumps(data)
