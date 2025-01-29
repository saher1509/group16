from flask import Blueprint, render_template

# shop blueprint definition
shop = Blueprint('shop', __name__, static_folder='static', static_url_path='/shop', template_folder='templates')


# Routes
@shop.route('/shop')
def index():
    return render_template('shop.html')
