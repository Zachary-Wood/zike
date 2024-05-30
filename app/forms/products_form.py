from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField, SelectField, FileField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=['Slides', 'Lifestyle Shoe', "Men's Trail Running Shoes", 'Basketball Shoe', 'Running Shoe', 'Golf Shoe'], validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    gender = SelectField('Gender', choices=['Male', 'Female'], validators=[DataRequired()])
    size = SelectMultipleField('Choose your sizes', choices=['6',' 6.5', '7', '7.5', '8', '8.5','9', '9.5','10', '10.5', '11', '11.5', '12', '12.5',' 13', '14'], validators=[DataRequired()])
    clothing_type = SelectField('Clothing Type', choices=['Shoes', 'Sportswear', 'Shorts', 'T-Shirts'], validators=[DataRequired()] )
    product_image = FileField("Profile Image Url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Product")


class EditProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=['Slides', 'Lifestyle Shoe', "Men's Trail Running Shoes", 'Basketball Shoe', 'Running Shoe', 'Golf Shoe'], validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    gender = SelectField('Gender', choices=['Male', 'Female'], validators=[DataRequired()])
    size = SelectMultipleField('Choose your sizes', choices=[6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14], validators=[DataRequired()])
    clothing_type = SelectField('Clothing Type', choices=['Shoes', 'Sportswear', 'Shorts', 'T-Shirts'], validators=[DataRequired()] )
    product_image = FileField("Profile Image Url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Product")