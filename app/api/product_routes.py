from flask import Blueprint, jsonify, json, request, redirect
from flask_login import login_required, current_user
from app.models.products import Product
from app.forms.products_form import ProductForm, EditProductForm
from app.forms.review_form import ReviewForm, EditReviewForm
from app.models.reviews import Review
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
    indv_product = Product.query.get(id) # grab the product by a specific id
    
    product_data = [] # a list to hold all of thee data 
    if indv_product: # if we find a product to make it into a dictionary and put it into the list
        product_dict = indv_product.to_dict()
        product_data.append(product_dict)
        return {"single product": product_data}, 200 # return the data for the front end
    else: 
        return {"message": "Product not found"}, 404 # if no product is found we return a 404


# post a new product 
@product_routes.route('/new', methods=["POST"])
@login_required
def post_new_products():
    form = ProductForm() # form to conect to our form validations
    form["csrf_token"].data = request.cookies["csrf_token"] # make sure we get the csrf ticket


    if form.validate_on_submit():
        #we grab the image from the form.data
        image = form.data["product_image"]
        
        # set a url variable to be changed later
        url=None

        print('image', image) # print the image for help

        if image: # if there is an image we upload it to our s3 bucket and we make the url the url in the s3 bucket
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return jsonify({"message": "Your image could not be uploaded"}), 500

            url = upload['url']
           

        
       
        
        product_form_items = { # payload for the new product
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
        print(product_form_items)
        new_product = Product(**product_form_items) # spread the payload into a new product variable
        db.session.add(new_product) # add to db 
        db.session.commit() # commit the db
        return jsonify(new_product.to_dict()), 201 # we return the new product data for the front end

    return jsonify(form.errors), 400


@login_required
@product_routes.route("/<int:id>", methods=["PUT"])
def update_product(id):

    indv_product = Product.query.get(id) # get a product by its id to update 
    form = EditProductForm() # new form data

    if (current_user.id != indv_product.owner_id): # if the current user doesnt own the product we send a 401 error 
        return {"message": "You do not own this product"}, 401
    
    if not indv_product:
        return {"message": "Product could not be found"}, 404 #if not found throw a 404 
    


    form["csrf_token"].data = request.cookies["csrf_token"] # grab csrf token 
    if form.validate_on_submit():
        image = form.data["product_image"] # grab image from data
        
        url = None

        print('image', image)

        if image:
            image.filename = get_unique_filename(image.filename) # if there is an image thats not new upload it to s3 bucket 
            upload = upload_file_to_s3(image)

            if "url" not in upload:
                return jsonify({"message": "Your image could not be uploaded"}), 500

            url = upload['url']
           

        indv_product.name = form.data["name"] # set all the new data to what the user changed 
        indv_product.type = form.data["type"]
        indv_product.price = form.data["price"]
        indv_product.description = form.data["description"]
        indv_product.gender = form.data["gender"]
        indv_product.size = form.data["size"]
        indv_product.clothing_type = form.data["clothing_type"]
        indv_product.product_image = url

        db.session.commit()  # commit the new data
        return indv_product.to_dict(), 200 # send the front end all of the data to be displayed
    return jsonify(form.errors), 400 # if there was any form errors return a bad request 


@login_required
@product_routes.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    indv_product = Product.query.get(id) # we grab the id from the url 

    if not indv_product:  # if no product return 404 
        return {"message":"Can't find the product to delete"}, 404
    else: 
        db.session.delete(indv_product) # if theres a product we delete it by its id 
        db.session.commit() # commit those changes 
        return json.dumps({"message": "Succesfully Deleted your product"}), 202 # give a message that it was deleted 
    

@product_routes.route("/<int:id>/reviews")
def get_products_reviews(id):
    product_reviews = Review.query.filter_by(product_id = id).all() 

    if product_reviews is not None:
        all_product_reviews = {"reviews": [eachReview.to_dict() for eachReview in product_reviews]}
    else:
        all_product_reviews = {"reviews": []}

    return all_product_reviews, 200

@product_routes.route("/<int:id>/reviews/new", methods=["POST"])
def create_a_review_for_product(id):
    form = ReviewForm()

    form["csrf_token"].data = request.cookies["csrf_token"]


    if form.validate_on_submit():
        new_review = Review(
            user_id = current_user.id,
            product_id = id,
            review = form.data["review"],
            rating = form.data["rating"]
        )
    
    db.session.add(new_review)
    db.session.commit()
    
    return new_review.to_dict()

@product_routes.route('/<int:id>/reviews/<int:reviewId>', methods=["PUT"])
def update_a_review_for_product(reviewId, id):

    form = EditReviewForm()

    single_review = Review.query.get(reviewId)

    if not single_review: 
        return {"message": "Review could not be found"}, 404
    
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        single_review.review = form.data["review"]
        single_review.rating = form.data["rating"]

        db.session.commit()
        return single_review.to_dict(), 200
    return jsonify(form.errors), 400

@product_routes.route('/<int:id>/reviews/<int:reviewId>', methods=["DELETE"])
def delete_review(id, reviewId):
    indv_review = Review.query.get(reviewId)

    if not indv_review:
        return {"message":"Can't find the review to delete"}, 404
    else: 
        db.session.delete(indv_review)
        db.session.commit()
        return json.dumps({"message": "Succesfully Deleted your product"}), 202
    
@product_routes.route('/<int:id>/reviews/current')
def get_current_user_reviews(id):

    current_review = Review.query.filter_by(user_id = current_user.id)

    # if len(current_review) < 1:
    #     return {"message":"Reviews can be found for this user"}, 404
    
    return current_review.to_dict(), 200



