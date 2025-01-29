from flask import Blueprint, render_template, request, redirect, url_for, flash,session
from db_connector import orders, generate_temp_password  # Connect to orders collection and temp password generator

# Create a Blueprint for Order Management
orders_admin = Blueprint('orders_admin', __name__, static_folder='static', template_folder='templates')


# Secure login page
@orders_admin.route('/admin/orders', methods=['GET', 'POST'])
def admin_login():
    """ Secure login page with a temporary password for managing orders """
    if request.method == 'POST':
        entered_password = request.form.get('password')  # Retrieve password from form input
        if entered_password == generate_temp_password():  # Verify password
            session['admin_authenticated'] = True
            return redirect(url_for('orders_admin.manage_orders'))  # Redirect to order management page
        else:
            flash("❌ Incorrect password! ", "error")

    return render_template('admin_orders_login.html')  # Render login page template


# Orders management page (Read-Only)
@orders_admin.route('/admin/orders/manage', methods=['GET', 'POST'])
def manage_orders():
    """ Display all customer orders in the database """
    if not session.get('admin_authenticated'):
        return redirect(url_for('orders_admin.admin_login'))
    session['admin_authenticated'] = False
    all_orders = list(orders.find({}, {"_id": 1, "first_name": 1, "last_name": 1, "city": 1,
                                       "street_address": 1, "phone": 1, "email": 1, "notes": 1, "cart_items": 1,
                                       "order_date": 1}))
    return render_template('manage_orders.html', orders=all_orders)
