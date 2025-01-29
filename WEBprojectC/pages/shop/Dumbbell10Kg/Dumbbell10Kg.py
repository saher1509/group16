from flask import Blueprint, render_template

Dumbbell10Kg = Blueprint('Dumbbell10Kg', __name__, static_folder='static', static_url_path='/shop/Dumbbell10Kg',
                         template_folder='templates')


@Dumbbell10Kg.route('/shop/Dumbbell10Kg')
def index():
    return render_template('Dumbbell10Kg.html')
