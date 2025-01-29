from flask import Flask

###### App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')

###### Pages
## HomePage
from pages.homepage.homepage import homepage

app.register_blueprint(homepage)

## About Us
from pages.about.about import about

app.register_blueprint(about)

## Shop
from pages.shop.shop import shop

app.register_blueprint(shop)

## Cart
from pages.shop.cart import cart

app.register_blueprint(cart)

## Contact Us
from pages.contact.contact import contact

app.register_blueprint(contact)

## Page error handlers
from pages.page_error_handlers.page_error_handlers import page_error_handlers

app.register_blueprint(page_error_handlers)

from pages.search.search import search

app.register_blueprint(search)

from pages.shop.FT1Inspire.FT1Inspire import FT1Inspire
from pages.shop.X98Cross.X98Cross import X98Cross
from pages.shop.SpeederF60.SpeederF60 import SpeederF60
from pages.shop.KETTLERKE3086d.KETTLERKE3086d import KETTLERKE3086d
from pages.shop.SquatsMachine.SquatsMachine import SquatsMachine
from pages.shop.Dumbbell10Kg.Dumbbell10Kg import Dumbbell10Kg
from pages.shop.CurlBar.CurlBar import CurlBar
from pages.shop.WeightBench.WeightBench import WeightBench

app.register_blueprint(FT1Inspire)
app.register_blueprint(X98Cross)
app.register_blueprint(SpeederF60)
app.register_blueprint(KETTLERKE3086d)
app.register_blueprint(SquatsMachine)
app.register_blueprint(Dumbbell10Kg)
app.register_blueprint(CurlBar)
app.register_blueprint(WeightBench)

from pages.checkout.checkout import checkout

app.register_blueprint(checkout)

from pages.product_admin.product_admin import product_admin

app.register_blueprint(product_admin, url_prefix="/admin")

from pages.contact_admin.contact_admin import contact_admin

app.register_blueprint(contact_admin, url_prefix="/admin/contact")

from pages.orders_admin.orders_admin import orders_admin

app.register_blueprint(orders_admin, url_prefix="/admin/orders")

if __name__ == '__main__':
    app.run(debug=True)
