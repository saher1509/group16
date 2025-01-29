from flask import Blueprint, render_template, request, redirect, url_for, flash,session
from db_connector import products
from db_connector import generate_temp_password  # import the temporary password

# Create a Blueprint for product management
product_admin = Blueprint('product_admin', __name__, static_folder='static', template_folder='templates')


# Login route
@product_admin.route('/admin', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        entered_password = request.form.get('password')  # Get the entered password from the form
        if entered_password == generate_temp_password():  # Check if it matches the temporary password
            session['admin_authenticated'] = True
            return redirect(url_for('product_admin.manage_products'))  # Redirect to product management page

        else:
            flash("❌ Incorrect password! ", "error")

    return render_template('admin_login.html')  # Render the login page


# Product management route
@product_admin.route('/admin/manage', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'POST':
        product_id = int(request.form.get('product_id'))  # Get the product ID from the form
        new_stock = int(request.form.get('new_stock'))  # Get the new stock value
        products.update_one({"product_id": product_id}, {"$set": {"stock": new_stock}})  # Update stock in the database


    if not session.get('admin_authenticated'):
        return redirect(url_for('product_admin.admin_login'))
    session['admin_authenticated'] = False
    all_products = list(products.find({}, {"_id": 0}))  # Fetch all products excluding the ID field
    return render_template('manage_products.html', products=all_products)  # Render the product management page
