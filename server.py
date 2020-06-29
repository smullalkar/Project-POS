from flask import Flask
import jwt
from flask import request
from flask_mysqldb import MySQL
import json
import time
from flask_cors import CORS
import time
import datetime
import math

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

# sending stocks data
@app.route('/user/inventory/<email>')
def user_inventory(email):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT u.organisation,u.address,s.item_name,s.price_per_unit_purchased,s.price_per_unit_selling,s.qty, s.tax, s.id, s.supplier_id, sup.name, u.contact, u.email FROM user as u JOIN stock as s ON u.id = s.user_id JOIN supplier as sup on s.supplier_id = sup.id WHERE u.email = "%s";'''%(email))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    return json.dumps(data)

# sending monthly sales data
@app.route('/user/monthlysales/<user_id>/<month>/<year>')
def monthlysales(user_id,month,year):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT SUM(amount) FROM bill WHERE MONTH(created_at) = "%s" AND YEAR(created_at) = "%s" AND user_id = "%d";'''%(month,year,user_id))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
        
    cur1 = mysql.connection.cursor()
    cur1.execute('''select SUM(((amount+(amount*(tax/100)))*qty)) from expenses WHERE MONTH(created_at) = "%s" AND YEAR(created_at) = "%s";'''%(month,year))
    result1 = cur1.fetchall()
    for row1 in result1:
        data.append(row1)
    
    return json.dumps(data)

# sending any day sales data
@app.route('/user/allsales/<user_id>/<date>')
def allsales(user_id,date):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT SUM(amount) FROM bill WHERE date(created_at) = "%s" AND user_id = "%d";'''%(date,user_id))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    
    cur1 = mysql.connection.cursor()
    cur1.execute('''select SUM(((amount+(amount*(tax/100)))*qty)) from expenses WHERE date(created_at) = "%s";'''%(date))
    result1 = cur1.fetchall()
    for row1 in result1:
        data.append(row1)
    
    return json.dumps(data)

# sending year sales data
@app.route('/user/yearsales/<user_id>/<year>')
def yearsales(user_id,year):
    cur = mysql.connection.cursor()
    cur.execute('''select SUM(amount), MONTH(created_at),user_id,YEAR(created_at) from bill WHERE YEAR(created_at)='%s' GROUP BY MONTH(created_at),user_id,YEAR(created_at) HAVING user_id="%d";'''%(year,int(user_id)))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    
    # cur1 = mysql.connection.cursor()
    # cur1.execute('''select SUM(((amount+(amount*(tax/100)))*qty)) from expenses WHERE date(created_at) = "%s";'''%(date))
    # result1 = cur1.fetchall()
    # for row1 in result1:
    #     data.append(row1)
    
    return json.dumps(data)

# send customer invoice
@app.route('/user/customer/bill/<b_id>')
def customer_invoice(b_id):
    cur = mysql.connection.cursor()
    cur.execute('''SELECT b.id as bill_id, b.amount as bill_amount,b.created_at as bill_date,c.id as customer_id,c.name as customer_name,c.contact as customer_contact,c.email as customer_email, s.item_name as stock_name,s.price_per_unit_selling as stock_price,s.tax as stock_tax,bi.qty as stock_qty FROM bill AS b JOIN customer AS c ON b.customer_id=c.id JOIN bill_items as bi on b.id=bi.bill_id JOIN stock as s on bi.stock_id=s.id WHERE b.id = "%d";'''%(int(b_id)))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    return json.dumps(data, default=str)

# sending customers data or bill data
@app.route('/user/customer')
def user_customers():
    # cur = mysql.connection.cursor()
    # cur.execute('''SELECT u.organisation, b.amount, b.created_at, c.name, c.contact, b.id, c.id FROM user as u JOIN bill as b ON u.id = b.user_id JOIN customer as c ON b.customer_id = c.id WHERE u.email = "%s";'''%(email))
    # result = cur.fetchall()
    # data = []
    # for row in result:
    #     data.append(row)
    # return json.dumps(data, default=str)
    user_id = request.args.get('user_id', type = int)
    page = request.args.get('page', type = int)
    per_page = request.args.get('per_page',type = int)

    cur = mysql.connection.cursor()
    cur.execute('''SELECT u.organisation, b.amount, b.created_at, c.name, c.contact, b.id, c.id FROM user as u JOIN bill as b ON u.id = b.user_id JOIN customer as c ON b.customer_id = c.id WHERE u.id = %d ;'''%(user_id))
    result = cur.fetchall()
    
    data=[]
    for row in result:
        data.append(row)
    
    curr_page = page
    total_pages = math.ceil(len(data)/per_page)
    prev_page_end = (curr_page-1) * per_page
    curr_page_end = curr_page * per_page
    curr_page_items = data[prev_page_end:curr_page_end]
    return json.dumps({'data':curr_page_items,'total_pages':total_pages, 'curr_page':curr_page},default=str)

# sending suppliers data
@app.route('/user/supplier/<user_email>')
def user_supplier(user_email):
    cur = mysql.connection.cursor()
    cur.execute('''select s.id, s.name, s.address, s.contact, us.id from user_supplier as us JOIN user as u on us.user_id = u.id JOIN supplier as s on us.supplier_id=s.id WHERE u.email = '%s';'''%(user_email))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    return json.dumps(data)

# delete suppliers data
@app.route('/user/supplier/delete/<user_supplier_id>')
def delete_supplier(user_supplier_id):
    cur = mysql.connection.cursor()
    cur.execute('''DELETE FROM user_supplier WHERE id = '%s';'''%(user_supplier_id))
    mysql.connection.commit()
    cur.close()

    return {'message': 'supplier deleted'}

# delete stock data
@app.route('/user/stock/delete/<stock_id>')
def delete_stock(stock_id):
    cur = mysql.connection.cursor()
    cur.execute('''DELETE FROM stock WHERE id = '%s';'''%(stock_id))
    mysql.connection.commit()
    cur.close()

    return {'message': 'stock deleted'}

# Registeration for a new user
@app.route("/user/register", methods = ["POST"])
def create():
    organisation = request.json["organisation"]
    address = request.json["address"]    
    contact = request.json["contact"]    
    email = request.json["email"]
    password = request.json["password"]       
    
    cur = mysql.connection.cursor()

    cur.execute('''INSERT INTO user(organisation,address,contact,email,password) VALUES ("%s","%s","%s","%s","%s");'''%(organisation,address,contact,email,password))
    mysql.connection.commit()
    cur.close()

    return json.dumps({"user_added": True, "message": "registeration successful"}) 

# adding customers or returning customers if already exists
@app.route("/customer/add", methods = ["POST"])
def customer_add_return():
    name = request.json["customer_name"]
    contact = request.json["contact"]    
    email = request.json["email"]
    
    cur = mysql.connection.cursor()
    cur.execute('''select * from customer WHERE email = '%s';'''%(email))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    
    if len(data) != 0 and data[0][3] == email:
        return json.dumps(data)
    else:
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO customer(name,contact,email) VALUES ("%s","%s","%s");'''%(name,contact,email))
        mysql.connection.commit()
        cur.close()

        cur = mysql.connection.cursor()
        cur.execute('''select * from customer WHERE email = '%s';'''%(email))
        result = cur.fetchall()
        data = []
        for row in result:
            data.append(row)
        
        return json.dumps(data)
    
# adding Bill
@app.route("/customer/add/bill", methods = ["POST"])
def addCustomerBill():
    customer_id = int(request.json["customer_id"])
    stockitems_and_qty = request.json["stockitems_and_qty"]    
    now = time.strftime('%Y-%m-%d %H:%M:%S')
    user_id = int(request.json["user_id"])
    amount = float(request.json["amount"])
    
    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO bill(amount,customer_id,created_at,user_id) VALUES('%f','%d','%s','%d')'''%(amount,customer_id,now,user_id))
    mysql.connection.commit()
    cur.close()
    
    cur = mysql.connection.cursor()
    cur.execute('''select id from bill WHERE customer_id = '%d' AND created_at = '%s';'''%(customer_id,now))
    result = cur.fetchall()
    
    bill_id = None
    for row in result:
        bill_id = row[0]
    
    for i in range(len(stockitems_and_qty)):
        qty = int(stockitems_and_qty[i][1])
        st_id = stockitems_and_qty[i][0][7]
        
        cur = mysql.connection.cursor()
        cur.execute('''UPDATE stock SET qty = qty-%d WHERE id= "%d";'''%(qty,st_id))
        mysql.connection.commit()
        cur.close()
        
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO bill_items(stock_id,qty,bill_id,created_at) VALUES ("%d","%d","%d","%s");'''%(st_id,qty,bill_id,now))
        mysql.connection.commit()
        cur.close()

    return {'message' : 'Bill added'}

# adding items to stocks
@app.route("/user/stock/add", methods = ["POST"])
def addItemToStock():
    item_name = request.json["item_name"]
    ppu = request.json["ppu"]    
    spu = request.json["spu"]    
    qty = request.json["qty"]
    tax = request.json["tax"]
    supplier = request.json['supplier']
    user_id = request.json['user_id']
    now = time.strftime('%Y-%m-%d %H:%M:%S')
    
    cur = mysql.connection.cursor()
    cur.execute('''INSERT INTO stock(supplier_id,item_name,price_per_unit_purchased,price_per_unit_selling,user_id,tax,qty,created_at) VALUES ("%d","%s","%d","%d","%d","%d","%d","%s");'''%(supplier,item_name,ppu,spu,user_id,tax,qty,now))
    mysql.connection.commit()
    cur.close()
    
    cur = mysql.connection.cursor()
    cur.execute('''SELECT price_per_unit_purchased,id,created_at,tax,qty FROM stock WHERE item_name = "%s" AND price_per_unit_purchased = "%d" AND price_per_unit_selling = "%d";'''%(item_name,ppu,spu))
    result = cur.fetchall()
    data = []
    for row in result:
        cur = mysql.connection.cursor()
        cur.execute('''INSERT INTO expenses(amount,stock_id,created_at,tax,qty,user_id) VALUES ("%d","%d","%s","%d","%d","%d");'''%(int(row[0]),int(row[1]),row[2],int(row[3]),int(row[4],user_id)))
        mysql.connection.commit()
        cur.close()
        
    return {'message' : 'Item added'}

# edit item in stock
@app.route("/user/stock/edit/<stock_id>", methods = ["POST"])
def editItemToStock(stock_id):
    item_name = request.json["item_name"]
    ppu = request.json["ppu"]    
    spu = request.json["spu"]    
    qty = request.json["qty"]
    tax = request.json["tax"]
    supplier_id = request.json['supplier_id']
    user_id = request.json['user_id']
    cur = mysql.connection.cursor()

    cur.execute('''UPDATE stock SET supplier_id = '%s',item_name = '%s' ,price_per_unit_purchased = '%s', price_per_unit_selling = '%s',user_id = '%s', tax = '%s' ,qty = '%s' WHERE id = %s ;'''%(supplier_id,item_name,ppu,spu,user_id,tax,qty,stock_id))
    mysql.connection.commit()
    cur.close()

    return {'message' : 'Item Edited'}

# adding suppliers
@app.route("/user/supplier/add", methods = ["POST"])
def addSupplier():
    name = request.json["name"]
    address = request.json["address"]    
    contact = request.json["contact"]    
    user_id = request.json["user_id"]
    
    cur = mysql.connection.cursor()

    cur.execute('''INSERT INTO supplier(name,address,contact) VALUES ("%s","%s","%s");'''%(name,address,contact))
    mysql.connection.commit()
    cur.close()
    
    cur = mysql.connection.cursor()
    cur.execute('''select id from supplier WHERE name = '%s';'''%(name))
    result = cur.fetchall()
    supplier_id = None
    for row in result:
        supplier_id = row[0]
    
    cur = mysql.connection.cursor()

    cur.execute('''INSERT INTO user_supplier(user_id,supplier_id) VALUES ('%s','%s');'''%(user_id,supplier_id))
    mysql.connection.commit()
    cur.close()

    cur = mysql.connection.cursor()
    cur.execute('''select s.id, s.name, s.address, s.contact, us.id from user_supplier as us JOIN user as u on us.user_id = u.id JOIN supplier as s on us.supplier_id=s.id WHERE u.id = '%s';'''%(user_id))
    result = cur.fetchall()
    data = []
    for row in result:
        data.append(row)
    return json.dumps(data)

# updating suppliers
@app.route("/user/supplier/edit/<supplier_id>", methods = ["POST"])
def editSupplier(supplier_id):
    name = request.json["name"]
    address = request.json["address"]    
    contact = request.json["contact"]    
    user_id = request.json["user_id"]
    
    cur = mysql.connection.cursor()

    cur.execute('''UPDATE supplier SET name = '%s',address = '%s',contact = '%s' WHERE id = %s ;'''%(name,address,contact,supplier_id))
    mysql.connection.commit()
    cur.close()
    return {'message' : 'Suppleir Edited'}

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
    id = None
    organisation = None
    address = None
    contact = None
    
    for row in result:
        if row[4] == email and row[5] == password:
            flag = True
            id = row[0]
            organisation=row[1]
            address=row[2]
            contact=row[3]
            if row[4] == 'smullalkar@gmail.com' and row[5] == 'pass123':
                isAdmin = True
            else:
                isAdmin = False
            break
                
    if flag == True:
        payload = {'email': email, 'id': id, 'organisation': organisation, 'address': address, 'contact': contact, 'isadmin': isAdmin, 'message': True}
        key = 'secret'
        encode_jwt = jwt.encode(payload, key)
        return {'auth_token': encode_jwt.decode(), 'message': True}
    else:
        return {'message': 'username or password incorrect'}
    

# validation of token
@app.route('/auth_check', methods=['POST'])
def auth_check():
    auth_token = request.json['auth_token']

    key = 'secret'
    data = jwt.decode(auth_token, key)

    return json.dumps(data)

# pagination
@app.route('/user/customers/pagination')
def h():
    user_id = request.args.get('user_id', type = int)
    page = request.args.get('page', type = int)
    per_page = request.args.get('per_page',type = int)

    cur = mysql.connection.cursor()
    cur.execute('''SELECT u.organisation, b.amount, b.created_at, c.name, c.contact, b.id, c.id FROM user as u JOIN bill as b ON u.id = b.user_id JOIN customer as c ON b.customer_id = c.id WHERE u.id=%d;'''%(user_id))
    result = cur.fetchall()
    
    data=[]
    for row in result:
        data.append(row)
    
    total_items=len(data)
    prev_page=(page-1)*per_page
    curr_page=page*per_page
    return json.dumps({'data':data[prev_page:curr_page]},default=str)
