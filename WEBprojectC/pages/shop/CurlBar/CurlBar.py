from flask import Blueprint, render_template

# curl_bar blueprint definition
CurlBar = Blueprint('CurlBar', __name__, static_folder='static', static_url_path='/shop/CurlBar',
                    template_folder='templates')


# Route for Curl Bar product page
@CurlBar.route('/shop/CurlBar')
def index():
    return render_template('CurlBar.html')
