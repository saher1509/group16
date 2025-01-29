from flask import Blueprint, render_template

SquatsMachine = Blueprint('SquatsMachine', __name__, static_folder='static', static_url_path='/shop/SquatsMachine',
                          template_folder='templates')


@SquatsMachine.route('/shop/SquatsMachine')
def index():
    return render_template('SquatsMachine.html')
