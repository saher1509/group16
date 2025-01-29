from db_connector import *
from flask import render_template, request, Blueprint
from datetime import datetime


# Define the checkout blueprint
checkout = Blueprint(
    'checkout',
    __name__,
    static_folder='static',
    static_url_path='/cart/checkout',
    template_folder='templates'
)


def update_stock(cart_items):
    for item in cart_items:
        product_name = item["name"]  # Product name
        quantity = int(item["quantity"])  # Quantity purchased

        # Find the product in the database
        product = products.find_one({"name": product_name})
        if product:
            new_stock = product["stock"] - quantity  # Update stock
            if new_stock <= 5:  # if stock drops to 5 or below → reset to 100
                new_stock = 100
            products.update_one({"name": product_name}, {"$set": {"stock": new_stock}})


# Checkout page route
@checkout.route('/cart/checkout', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Collect form data
        first_name = request.form.get('first-name')
        last_name = request.form.get('last-name')
        city = request.form.get('city')
        street_address = request.form.get('street-address')
        phone = request.form.get('phone')
        email = request.form.get('email')
        notes = request.form.get('notes', 'No notes provided')

        # Retrieve cart items (JSON containing product name + quantity)
        cart_items_json = request.form.get('cartItems')
        if cart_items_json:
            import json
            cart_items = json.loads(cart_items_json)  # Convert JSON to Python list
        else:
            cart_items = []

        # Validate required fields
        errors = {}
        if not first_name:
            errors['first_name'] = "First name is required."
        if not last_name:
            errors['last_name'] = "Last name is required."
        if not city:
            errors['city'] = "City is required."
        if not street_address:
            errors['street_address'] = "Street address is required."
        if not phone or not phone.isdigit() or len(phone) != 10:
            errors['phone'] = "Phone number must be 10 digits."
        if not email or "@" not in email:
            errors['email'] = "Valid email is required."

        if errors:
            return render_template('checkout.html', success=False, errors=errors, form_data=request.form)

        else:
            # date and time order
            order_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")


            # Save the order to the database
            orders.insert_one({
                "first_name": first_name,
                "last_name": last_name,
                "city": city,
                "street_address": street_address,
                "phone": phone,
                "email": email,
                "notes": notes,
                "cart_items": cart_items,
                "order_date": order_date
            })

            # Update product stock after purchase
            update_stock(cart_items)

        return render_template('checkout.html', success=True, first_name=first_name, last_name=last_name)

    if request.method == 'GET':
        # Collect form data
        first_name = request.args.get('first-name')
        last_name = request.args.get('last-name')
        city = request.args.get('city')
        street_address = request.args.get('street-address')
        phone = request.args.get('phone')
        email = request.args.get('email')
        notes = request.args.get('notes', 'None')
        cart_items = request.args.getlist('cartItems')

        # Retrieve cart items (JSON containing product name + quantity)
        cart_items_json = request.form.get('cartItems')
        if cart_items_json:
            import json
            cart_items = json.loads(cart_items_json)  # Convert JSON to Python list
        else:
            cart_items = []

        # Validate required fields
        errors = {}
        if not first_name:
            errors['first_name'] = "First name is required."
        if not last_name:
            errors['last_name'] = "Last name is required."
        if not city:
            errors['city'] = "City is required."
        if not street_address:
            errors['street_address'] = "Street address is required."
        if not phone or not phone.isdigit() or len(phone) != 10:
            errors['phone'] = "Phone number must be 10 digits."
        if not email or "@" not in email:
            errors['email'] = "Valid email is required."

        if errors:
            return render_template('checkout.html', success=False, errors=errors, form_data=request.args)

        else:
            orders.insert_one({"first_name": first_name,
                               "last_name": last_name,
                               "city": city,
                               "street_address": street_address,
                               "phone": phone,
                               "email": email,
                               "notes": notes,
                               "cart_items": cart_items})

            # Update product stock after purchase
            update_stock(cart_items)

        # Show success message in the template
        return render_template('checkout.html', success=True, first_name=first_name, last_name=last_name)
