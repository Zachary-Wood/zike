from app.models.reviews import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_reviews():

    reviews = [
        {
            "user_id": 2,
            "product_id": 1,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 1,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 2,
            "review": "Comfortable fit, stylish for everyday use.", 
            "rating": 4
        }, 
        {
            "user_id": 2,
            "product_id": 2,
            "review": "Sole wore out quickly. Disappointed.", 
            "rating": 1
        }, 
        {
            "user_id": 2,
            "product_id": 3,
            "review": "Great for race day! Best marathon shoes ive ever worn!", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 3,
            "review": "Best carbon plated shoe i have ever used was great for speed workouts", 
            "rating": 4
        }, 
        {
            "user_id": 3,
            "product_id": 4,
            "review": "Poor ankle support, uncomfortable fit.", 
            "rating": 2
        }, 
        {
            "user_id": 2,
            "product_id": 4,
            "review": "Traction is inconsistent, slips on court.", 
            "rating": 1
        }, 

        {
            "user_id": 2,
            "product_id": 5,
            "review": "Quality materials, stylish look. Highly recommend!", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 5,
            "review": "Comfortable fit, stylish for everyday use.", 
            "rating": 3
        }, 
        {
            "user_id": 3,
            "product_id": 6,
            "review": "Traction is poor, slippery on wet surfaces.", 
            "rating": 2
        },
        {
            "user_id": 2,
            "product_id": 6,
            "review": "Size runs small, had to return.", 
            "rating": 1
        },
        {
            "user_id": 2,
            "product_id": 7,
            "review": "Amazing comfort and stylish design, worth every penny!", 
            "rating": 5
        },
        {
            "user_id": 3,
            "product_id": 7,
            "review": "Excellent quality and durability, perfect for everyday wear.", 
            "rating": 5
        },
        {
            "user_id": 2,
            "product_id": 8,
            "review": "Unbelievable comfort! Feels like running on clouds.", 
            "rating": 5
        },
        {
            "user_id": 3,
            "product_id": 8,
            "review": "Superb support and cushioning for long runs. Highly recommend!", 
            "rating": 5
        },
        {
            "user_id": 3,
            "product_id": 9,
            "review": "The Nike Dunk Lows looked great initially but started falling apart after just a few months of wear. Disappointed with the quality and durability.", 
            "rating": 3
        },
        {
            "user_id": 2,
            "product_id": 9,
            "review": "The Nike Dunk Lows were uncomfortable and lacked sufficient cushioning. Not ideal for long walks or extended wear.", 
            "rating": 3
        },
        {
            "user_id": 2,
            "product_id": 10,
            "review": "The Nike Pegasus 40 Premiums offer incredible comfort and style. Perfect for both running and casual wear!", 
            "rating": 5
        },
        {
            "user_id": 3,
            "product_id": 10,
            "review": "Love the premium materials and responsive cushioning of the Nike Pegasus 40 Premiums. They provide excellent support and durability.", 
            "rating": 5
        },
        {
            "user_id": 3,
            "product_id": 11,
            "review": "The Nike Zoom Vomero 5 combines retro style with modern comfort. The Zoom Air cushioning is responsive and perfect for long runs.", 
            "rating": 5
        },
        {
            "user_id": 2,
            "product_id": 11,
            "review": "The Nike Zoom Vomero 5 felt bulky and uncomfortable, lacking the lightweight feel I expected from a running shoe.", 
            "rating": 1
        },
        {
            "user_id": 2,
            "product_id": 12,
            "review": "The Nike golf shoe offers exceptional grip and stability on the course. It's lightweight and comfortable, perfect for long rounds.", 
            "rating": 5
        },

        {
            "user_id": 3,
            "product_id": 12,
            "review": "Love the stylish design and waterproof features of the Nike golf shoe. It keeps my feet dry and provides great support during swings.", 
            "rating": 5
        },
        
        {
            "user_id": 2,
            "product_id": 13,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 13,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 14,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 14,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 15,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 15,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 16,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 16,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 17,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 17,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 18,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 18,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 19,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 19,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 20,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 20,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 21,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 21,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 22,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 22,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 23,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 23,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
        {
            "user_id": 2,
            "product_id": 24,
            "review": "Comfortable and stylish! Great support for running.", 
            "rating": 5
        }, 
        {
            "user_id": 3,
            "product_id": 24,
            "review": "Great for jogging, supportive and breathable.", 
            "rating": 5
        }, 
    
    ]
    
    [db.session.add(Review(**review)) for review in reviews]
    db.session.commit()
    
   


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))
        
    db.session.commit()
