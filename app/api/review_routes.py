from flask import Blueprint, jsonify, json, request, redirect
from app.models.reviews import Review
from flask_login import login_required, current_user

review_routes = Blueprint('reviews', __name__)



@review_routes.route('/current', methods=["GET"])
def get_current_user_reviews():

    current_review = Review.query.filter_by(user_id = current_user.id).all()
    print(current_review)

    if not current_review:
        return {"message": "No reviews found for this user"}, 404

    reviews_list = [review.to_dict() for review in current_review]
    
    return reviews_list, 200