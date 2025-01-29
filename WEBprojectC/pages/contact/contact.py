from db_connector import *
from flask import Blueprint, render_template, request

# Define the contact blueprint
contact = Blueprint(
    'contact',
    __name__,
    static_folder='static',
    static_url_path='/contact',
    template_folder='templates'
)


# Contact page route
@contact.route('/contact', methods=['GET', 'POST'])
def index():
    request_type = request.method
    if request.method == 'POST':
        # Collect form data
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message', 'No message provided')

        # Validate required fields
        errors = {}
        if not name:
            errors['name'] = "Name is required."
        if not email:
            errors['email'] = "Email is required."
        elif "@" not in email:  # Basic email validation
            errors['email'] = "Invalid email address."
        if not phone or not phone.isdigit() or len(phone) != 10:
            errors['phone'] = "Phone number must be 10 digits."

        if errors:
            return render_template('contact.html', success=False, errors=errors, form_data=request.form)

            # Save to MongoDB
        else:
            customersContactUS.insert_one({
                "name": name,
                "email": email,
                "phone": phone,
                "message": message,
                "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            })
        # Show success message in the template
        return render_template('contact.html', success=True, request_type=request_type, name=name)
    return render_template('contact.html', success=False)

    if request.method == 'GET':
        # Collect form data
        name = request.args.get('name')
        email = request.args.get('email')
        phone = request.args.get('phone')
        message = request.args.get('message', 'No message provided')

        # Save to MongoDB
        customersContactUS.insert_one({
            "name": name,
            "email": email,
            "phone": phone,
            "message": message
        })

        # Validate required fields
        errors = {}
        if not name:
            errors['name'] = "Name is required."
        if not email:
            errors['email'] = "Email is required."
        elif "@" not in email:  # Basic email validation
            errors['email'] = "Invalid email address."
        if not phone or not phone.isdigit() or len(phone) != 10:
            errors['phone'] = "Phone number must be 10 digits."

        if errors:
            return render_template('contact.html', success=False, errors=errors, form_data=request.args)

        # Show success message in the template
        return render_template('contact.html', success=True, request_type=request_type, name=name)
    return render_template('contact.html', success=False)
