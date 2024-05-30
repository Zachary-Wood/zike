from flask import Blueprint, jsonify, json, request, redirect
from flask_login import login_required, current_user
from app.models.products import Product
from app.forms.products_form import ProductForm
from app.api.AWS_helpers import upload_file_to_s3, get_unique_filename
from app.models import db




product_routes = Blueprint('products', __name__)





# get all products
@product_routes.route('/')
def get_products():
    fetched_products = Product.query.all() # we grab an array of all the of the products

    if len(fetched_products) < 1: # use case to check if the array we grabbed is empty 
        return {"message": "no products found"}, 404 # if so throw a 404 
    
    products_list = [] # a list to hold all of the objects
    for product in fetched_products: # iterate through our array of products 
        product_dict = product.to_dict() # we change each item to a dictionary to look like [{product1}, {product2}]
        products_list.append(product_dict) # append it to an array to iterate through 

        
    
    
    return {"products": products_list}, 200 # format the data and add a status code 


# get a products based on id 
@product_routes.route("/<int:id>", methods=["GET"])
def get_product_by_id(id):
    indv_product = Product.query.get(id)
    
    product_data = []
    if indv_product:
        product_dict = indv_product.to_dict()
        product_data.append(product_dict)
        return {"single product": product_data}, 200
    else: 
        return {"message": "Product not found"}, 404


# post a new product 
@login_required
@product_routes.route('/new', methods=["POST"])
def post_new_products():
    form = ProductForm()

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        

        image = form.data["product_image"]
        url = None
        if image: 
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            print(upload)

            if "url" not in upload:
                return {"message": "Your image could not be uploaded"}, 500
        
            url = upload['url']


        product_form_items = {
                "owner_id": current_user.id,
                "name": form.data["name"],
                "type": form.data["type"],
                "price": form.data["price"],
                "description": form.data["description"],
                "gender": form.data["gender"],
                "size": form.data["size"],
                "clothing_type": form.data["clothing_type"],
                "product_image": url
            }

        new_product = Product(**product_form_items)

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict(), 201

    return form.errors, 400

