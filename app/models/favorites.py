from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Favorite(db.Model):
    __tablename__ = 'favorite'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    

    id = db.Column(db.Integer, primary_key=True)
    fav_owner_id = db.column(db.Integer, db.ForeignKey(add_prefix_for_prod('user.id')), nullable=False)
    fav_item_id = db.column(db.Integer, db.ForeignKey(add_prefix_for_prod('product.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


    def to_dict(self):
        return {
            'id': self.id,
            'fav_owner_id': self.fav_owner_id,
            'fav_item_id': self.fav_item_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
