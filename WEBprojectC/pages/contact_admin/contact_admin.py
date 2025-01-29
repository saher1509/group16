from flask import Blueprint, render_template, request, redirect, url_for, flash,session
from bson import ObjectId
from db_connector import customersContactUS, generate_temp_password  # Import database and temp password function

# Create a Blueprint for contact management
contact_admin = Blueprint('contact_admin', __name__, static_folder='static', template_folder='templates')


# Admin login page
@contact_admin.route('/admin/contact', methods=['GET', 'POST'])
def admin_login():
    """Admin login page with a temporary password."""
    if request.method == 'POST':
        entered_password = request.form.get('password')  # Get entered password
        if entered_password == generate_temp_password():  # Check if it matches
            session['admin_authenticated'] = True
            return redirect(url_for('contact_admin.manage_contacts'))  # Redirect to contact management
        else:
            flash("❌ Incorrect password! ", "error")

    return render_template('admin_contact_login.html')  # Render login page


# Contact management page
@contact_admin.route('/admin/contact/manage', methods=['GET', 'POST'])
def manage_contacts():
    """Displays all contact form submissions and allows deletion."""
    if request.method == 'POST':
        contact_id = request.form.get('contact_id')  # Get the ID of the contact to delete
        customersContactUS.delete_one({"_id": ObjectId(contact_id)})  # Delete the contact

    if not session.get('admin_authenticated'):
        return redirect(url_for('contact_admin.admin_login'))
    session['admin_authenticated'] = False
    all_contacts = list(
        customersContactUS.find({}, {"_id": 1, "name": 1, "email": 1, "phone": 1, "message": 1, "timestamp": 1}))
    return render_template('manage_contacts.html', contacts=all_contacts)
