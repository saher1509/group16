from flask import Blueprint, render_template

WeightBench = Blueprint('WeightBench', __name__, static_folder='static', static_url_path='/shop/WeightBench',
                        template_folder='templates')


@WeightBench.route('/shop/WeightBench')
def index():
    return render_template('WeightBench.html')
