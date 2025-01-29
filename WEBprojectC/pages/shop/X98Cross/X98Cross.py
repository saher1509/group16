from flask import Blueprint, render_template

X98Cross = Blueprint('X98Cross', __name__, static_folder='static', static_url_path='/shop/X98Cross', template_folder='templates')

@X98Cross.route('/shop/X98Cross')
def index():
    return render_template('X98Cross.html')
