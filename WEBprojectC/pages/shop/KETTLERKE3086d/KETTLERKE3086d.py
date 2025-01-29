from flask import Blueprint, render_template

KETTLERKE3086d = Blueprint('KETTLERKE3086d', __name__, static_folder='static', static_url_path='/shop/KETTLERKE3086d',
                           template_folder='templates')


@KETTLERKE3086d.route('/shop/KETTLERKE3086d')
def index():
    return render_template('KETTLERKE3086d.html')
