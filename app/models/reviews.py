from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable = False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('product.id')), nullable = False)
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    owner = db.relationship('User', back_populates='reviews')
    product = db.relationship('Product', back_populates='reviews')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_firstname': self.user.firstname,
            'product_id': self.product_id,
            'review': self.review,
            'rating': self.rating,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }