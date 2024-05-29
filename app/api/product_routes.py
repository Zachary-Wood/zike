from flask import Blueprint, jsonify
from flask_login import login_required
from app.models.products import Product
import json


product_routes = Blueprint('products', __name__)






@product_routes.route('/')
def get_products():
    fetched_products = Product.query.all()
    
    products_list = []
    for product in fetched_products
    
    
    return jsonify(products_list)
