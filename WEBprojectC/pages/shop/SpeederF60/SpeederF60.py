from flask import Blueprint, render_template

SpeederF60 = Blueprint('SpeederF60', __name__, static_folder='static', static_url_path='/shop/SpeederF60',
                       template_folder='templates')


@SpeederF60.route('/shop/SpeederF60')
def index():
    return render_template('SpeederF60.html')
