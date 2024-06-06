from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectMultipleField, SelectField, FileField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired
from app.api.AWS_helpers import ALLOWED_EXTENSIONS


class ProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=['Slides', 'Lifestyle Shoe', "Trail Running Shoes", 'Basketball Shoe', 'Running Shoe', 'Golf Shoe'], validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    gender = SelectField('Gender', choices=['Male', 'Female'], validators=[DataRequired()])
    size = StringField('Size')
    clothing_type = SelectField('Clothing Type', choices=['Shoes', 'Sportswear', 'Shorts', 'T-Shirts'], validators=[DataRequired()] )
    product_image = FileField("Image Url", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Product")


class EditProductForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    type = SelectField('Type', choices=['Slides', 'Lifestyle Shoe', "Trail Running Shoes", 'Basketball Shoe', 'Running Shoe', 'Golf Shoe'], validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    gender = SelectField('Gender', choices=['Male', 'Female'], validators=[DataRequired()])
    size = StringField('Size', validators=[DataRequired()])
    clothing_type = SelectField('Clothing Type', choices=['Shoes', 'Sportswear', 'Shorts', 'T-Shirts'], validators=[DataRequired()] )
    product_image = FileField("Product Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Product")