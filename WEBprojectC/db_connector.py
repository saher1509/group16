import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import hashlib
from datetime import datetime

# get your uri from .env file
uri = "mongodb+srv://saher1509:saher1509@cluster0.mlke2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# create cluster
cluster = MongoClient(uri, server_api=ServerApi('1'))

# get all dbs and collestions that needed
mydatabase = cluster['mydatabase']

# --------------------- customersContactUS-----------------------
customersContactUS = mydatabase['customersContactUS']  # Collection for contact form
# ---- here we used insert that found in contact.py

# -----------------orders---------------------------------------
orders = mydatabase['orders']  # Collection for storing customer orders
# ---- here we used insert that found in checkout.py


# ----------------------------- products ------------------------
products = mydatabase['products']
initial_products = [
    {"product_id": 1, "name": "FT1 Inspire", "price": 10000, "stock": 100},
    {"product_id": 2, "name": "X98 Cross", "price": 2000, "stock": 100},
    {"product_id": 3, "name": "Speeder F60", "price": 3000, "stock": 100},
    {"product_id": 4, "name": "KETTLER KE3086d", "price": 9000, "stock": 100},
    {"product_id": 5, "name": "Squats Machine", "price": 3000, "stock": 100},
    {"product_id": 6, "name": "Dumbbell 10 Kg", "price": 100, "stock": 100},
    {"product_id": 7, "name": "Curl Bar", "price": 300, "stock": 100},
    {"product_id": 8, "name": "Weight Bench", "price": 1000, "stock": 100}
]

# add only if the product is not found (this means we only added them once)
for product in initial_products:
    if not products.find_one({"product_id": product["product_id"]}):
        products.insert_one(product)


# ---------------- here we used insert,find,update that found in checkout.py


# create new password every 30 minutes for  products management login and for contacts management login
def generate_temp_password():
    current_time = datetime.now()
    time_key = f"{current_time.year}-{current_time.month}-{current_time.day}-{current_time.hour}-{current_time.minute // 30}"
    hashed_password = hashlib.sha256(time_key.encode()).hexdigest()[:6]  # first 6 digits
    return hashed_password


# print the current password for the admin
print("📌 Temporary Password:", generate_temp_password())

# -------------------**** in product_admin.py we used update,find
# -------------------**** in contact_admin.py we used delete,find
# -------------------**** in orders_admin.py we used find

