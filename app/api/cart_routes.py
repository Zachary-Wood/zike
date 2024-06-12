from flask import Blueprint, jsonify, json, request, redirect
from flask_login import login_required, current_user
from app.models.cart import Cart
from app.models import db
from app.forms.cart_form import CartForm, UpdateCartForm
from app.models.products import Product



cart_routes = Blueprint('cart', __name__)


#get all cart items
@login_required
@cart_routes.route('/<int:user_id>', methods=["GET"])
def get_current_users_cart(user_id):

    # if user_id is None:
    #     return {"message": "Please login to view your cart"}

    users_cart = Cart.query.filter(user_id == Cart.user_id).all()

    cart_item = []
    for cart_item in users_cart:
        cart_items_data = Product.query.filter(Product.id == cart_item.product_id).all()
        cart_item.append(cart_items_data)
    return cart_item


@cart_routes.route('/', methods=['POST'])
@login_required # ensure that the user is logged in 
def add_cart_item():
    form = CartForm() # we set a form for our data

    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit(): # if the form is valid when the user submits it 
        new_cart_item = Cart( # we create a new cart item with all the needed info
            user_id=form.data['user_id'],
            product_id=form.data['product_id'],
            size=form.data['size'],
            quantity=form.data['quantity'],
        )
    
    db.session.add() # we add this item to the database 
    db.session.commit() # we commit these changes
    return jsonify(new_cart_item.to_dict()), 201 # we return a dictionary to be added to an array on the front end

@login_required
@cart_routes.route('/<int:id>', methods=["PUT"])
def update_cart_item(id): 
    indv_cart_item = Cart.query.get(id)

    if not indv_cart_item: 
        {"message": "No items found"}, 404
    
    form = UpdateCartForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        indv_cart_item.user_id = form.data['user_id']
        indv_cart_item.product_id=form.data['product_id']
        indv_cart_item.size=form.data['size']
        indv_cart_item.quantity=form.data['quantity']

        db.session.commit()
        return indv_cart_item.to_dict(), 200
    
    return jsonify(form.errors), 400

@login_required
@cart_routes.route('/<int:id>', methods=["DELETE"])

def delete_cart_item(id):
    indv_cart_item = Cart.query.get(id) # grab the cart items id 

    if not indv_cart_item:  # if its not found throw a 404 error 
        {"message": "No items found"}, 404
    else: 
        db.session.delete(indv_cart_item)   # if it finds the cart item by id we delete it from the database
        db.session.commit() # we commit those changes to the database 
        return json.dumps({"message": "Succesfully Deleted your cart item"}), 202 # give a message back to be used just in case on the front end 
    




    

