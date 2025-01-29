from flask import render_template
from flask import Blueprint

# about blueprint definition
search = Blueprint(
    'search',
    __name__,
    static_folder='static',
    static_url_path='/search',
    template_folder='templates'
)


# Routes
@search.route('/search')
def index():
    return render_template('search.html')

# from flask import Blueprint, request, jsonify
# from db_connector import get_products  # פונקציה שמביאה מוצרים מבסיס הנתונים
#
# search = Blueprint('search', __name__, static_folder='static', template_folder='templates')
#
# @search.route('/search')
# def search_products():
#     query = request.args.get('q', '').strip().lower()
#     filter_by = request.args.get('filter', 'name').strip().lower()
#
#     if not query:
#         return jsonify([])
#
#     # שליפת המוצרים מבסיס הנתונים
#     products = get_products()
#
#     # סינון תוצאות
#     results = [
#         {
#             "name": product["name"],
#             "slug": product["slug"],
#             "category": product["category"],
#             "price": product["price"]
#         }
#         for product in products
#         if query in product.get(filter_by, "").lower()
#     ]
#
#     return jsonify(results)
