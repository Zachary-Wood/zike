from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField, SelectField, FileField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired


class CartForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    product_id = IntegerField('Product ID', validators=[DataRequired()])
    size = SelectField('Size', choices=["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14"], validators=[DataRequired()])
    quantity = IntegerField('Quantity')


class UpdateCartForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    product_id = IntegerField('Product ID', validators=[DataRequired()])
    size = SelectField('Size', choices=["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14"], validators=[DataRequired()])
    quantity = IntegerField('Quantity')