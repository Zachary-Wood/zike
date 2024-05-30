from flask import Blueprint, jsonify, json, request, redirect
from flask_login import login_required, current_user
from app.models.products import Product
from app.forms.products_form import ProductForm, EditProductForm
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
@product_routes.route('/new', methods=["POST"])
@login_required
def post_new_products():
    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        image = form.data["product_image"]
        
        url=None

        print('image', image)

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return jsonify({"message": "Your image could not be uploaded"}), 500

            url = upload['url']
           

        sizes = form.data["size"]
        sizes_str = json.dumps(sizes)
        
        product_form_items = {
            "owner_id": current_user.id,
            "name": form.data["name"],
            "type": form.data["type"],
            "price": form.data["price"],
            "description": form.data["description"],
            "gender": form.data["gender"],
            "size": sizes_str,
            "clothing_type": form.data["clothing_type"],
            "product_image": url
        }
        new_product = Product(**product_form_items)
        db.session.add(new_product)
        db.session.commit()
        return jsonify(new_product.to_dict()), 201

    return jsonify(form.errors), 400


@login_required
@product_routes.route("/<int:id>", methods=["PUT"])
def update_product(id):

    indv_product = Product.query.get(id)
    form = EditProductForm()

    if (current_user.id != indv_product.owner_id):
        return {"message": "You do not own this product"}, 401
    
    if not indv_product:
        return {"message": "Product could not be found"}, 404
    


    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        image = form.data["product_image"]
        
        url = None

        print('image', image)

        if image:
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return jsonify({"message": "Your image could not be uploaded"}), 500

            url = upload['url']
           

        indv_product.name = form.data["name"]
        indv_product.type = form.data["type"]
        indv_product.price = form.data["price"]
        indv_product.description = form.data["description"]
        indv_product.gender = form.data["gender"]
        indv_product.size = form.data["size"]
        indv_product.clothing_type = form.data["clothing_type"]
        indv_product.product_image = url

        db.session.commit()
        return indv_product.to_dict(), 200
    return jsonify(form.errors), 400


@login_required
@product_routes.route("/<int:id>", methods=["DELETE"])
def delete_product():
    indv_product = Product.query.get(id)

    if not indv_product: 
        return {"message":"Can't find the product to delete"}, 404
    else: 
        db.session.delete(indv_product)
        db.session.commit()
        return json.dumps({"message": "Succesfully Deleted your product"}), 202
    

