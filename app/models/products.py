from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    type = db.Column(db.String(25), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(25), nullable=False)
    size = db.Column(db.String(25), nullable=False)
    clothing_type = db.Column(db.String(25), nullable=False)
    product_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    owner = db.relationship('User', back_populates='products')
    reviews = db.relationship('Review', back_populates='product', cascade="all, delete-orphan")

   
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'type': self.type,
            'price': self.price,
            'description': self.description,
            'gender': self.gender,
            'size': self.size,
            'clothing_type': self.clothing_type,
            'product_image': self.product_image,
            'reviews': [review.to_dict() for review in self.reviews],
            'created_at': self.created_at,
            'updated_at': self.updated_at

        }
