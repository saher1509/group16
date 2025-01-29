from flask import Blueprint, render_template

FT1Inspire = Blueprint('FT1Inspire', __name__, static_folder='static', static_url_path='/shop/FT1Inspire',
                       template_folder='templates')


@FT1Inspire.route('/shop/FT1Inspire')
def index():
    return render_template('FT1Inspire.html')
