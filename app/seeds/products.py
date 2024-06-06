from app.models.products import db, environment, SCHEMA, Product
from sqlalchemy.sql import text
import json

# sizes = [6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14]

# Adds a demo user, you can add other users here if you want
def seed_products():
    

    

    products = [
        {
        "owner_id": 4,
        "name": "Nike Invincible Run 3's",
        "type": "Running Shoe",
        "price": 190,
        "description": "Ultimate comfort and support for runs. Breathable mesh upper, plush ZoomX midsole, improved rocker geometry for stability. Ideal for long-distance runners needing durability and cushioned performance.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/invincible-3-mens-road-running-shoes-6MqQ72+(1).png' 

        },
        {
        "owner_id": 4,
        "name": "Nike Air Max 1",
        "type": "Lifestyle Shoe",
        "price": 140,
        "description": "Classic style, modern comfort. Visible Air cushioning, durable leather and mesh upper, padded collar for comfort. Iconic and versatile sneaker design.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/air-max-1-mens-shoes-2C5sX2.png' 
        },
        {
        "owner_id": 4,
        "name": "Nike Alphafly 3",
        "type": "Running Shoe",
        "price": 285,
        "description": "Engineered for peak performance. Flyknit upper, responsive ZoomX foam, Air Zoom pods for propulsion. Designed for elite runners seeking speed and efficiency.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/alphafly-3-mens-road-racing-shoes-6Nc43S.png' 
        },
        
        {
        "owner_id": 3,
        "name": "LeBron XXI",
        "type": "Basketball Shoe",
        "price": 200,
        "description": "Built for peak performance. Features include Nike Air Zoom Turbo cushioning, durable materials, and responsive support. Ideal for athletes seeking comfort and versatility on the court.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/lebron-xxi-basketball-shoes-DjB9tK.png' 
        },

        {
        "owner_id": 3,
        "name": "Nike Zegama 2",
        "type": "Men's Trail Running Shoes",
        "price": 180,
        "description": "Engineered for trail excellence. Features a durable yet lightweight construction, aggressive outsole for superior traction, and responsive cushioning for comfort on rugged terrain.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/zegama-2-mens-trail-running-shoes-fZw18h.png' 
        },

        {
        "owner_id": 3,
        "name": "Nike Calm",
        "type": "Slides",
        "price": 60,
        "description": "Designed for everyday comfort. Features include a lightweight and breathable upper, responsive cushioning for all-day wear, and a sleek, versatile design. Perfect for casual outings and daily activities with style and ease.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/calm-mens-mules-m5tTKn.png' 
        },

        {
        "owner_id": 3,
        "name": "Air Jordan 3 Retro",
        "type": "Lifestyle Shoe",
        "price": 200,
        "description": "Iconic style with modern comfort. Features premium leather upper, visible Air-Sole unit for cushioning, and rubber outsole for traction. Perfect for sneaker enthusiasts seeking classic design and everyday wearability.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/air-jordan-3-retro-womens-shoes-1KkgvW.png' 
        },

        {
        "owner_id": 2,
        "name": "Nike Invincible Run 3's",
        "type": "Running Shoe",
        "price": 190,
        "description": "Ultimate comfort and support for runs. Breathable mesh upper, plush ZoomX midsole, improved rocker geometry for stability. Ideal for long-distance runners needing",
        "gender": 'Female',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/invincible-3-mens-road-running-shoes-6MqQ72.png' 
        },

        {
        "owner_id": 2,
        "name": "Nike Dunk Low",
        "type": "Lifestyle Shoe",
        "price": 190,
        "description": "Timeless style, everyday comfort. Features a durable leather upper, responsive cushioning, and a rubber outsole for traction. Ideal for sneaker aficionados looking for versatile footwear that",
        "gender": 'Female',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/dunk-low-mens-shoes-l12Bc1.png' 
        },

        {
        "owner_id": 2,
        "name": "Nike Pegasus 40 Premium",
        "type": "Running Shoe",
        "price": 140,
        "description": "Elevated performance and style. Crafted with premium materials, responsive Zoom Air cushioning, and a durable outsole. Ideal for runners seeking comfort and versatility with a touch of luxury.",
        "gender": 'Female',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/pegasus-41-mens-road-running-shoes-7S90QB.png' 
        },

        {
        "owner_id": 2,
        "name": "Nike Zoom Vomero 5",
        "type": "Lifestyle Shoe",
        "price": 160,
        "description": "Classic design meets modern comfort. Features a retro-inspired upper with breathable mesh, Zoom Air cushioning for responsive feel, and a durable rubber outsole. Perfect for sneaker enthusiasts seeking ",
        "gender": 'Female',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/zoom-vomero-5-mens-shoes-MgsTqZ.png' 
        },

        {
        "owner_id": 4,
        "name": "Nike Air Zoom Infinity Tour NRG",
        "type": "Golf Shoe",
        "price": 190,
        "description": "Engineered for peak performance on the course. Features a lightweight, breathable upper, responsive Zoom Air cushioning, and a stable outsole for traction. Ideal for golfers seeking comfort and support during every swing.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/air-zoom-infinity-tour-nrg-golf-shoes-QB9QLd.jpeg' 
        },

        {
        "owner_id": 2,
        "name": "Nike Air VaporMax 2023 Flyknit",
        "type": "Lifestyle Shoe",
        "price": 210,
        "description": "Integrates revolutionary Flyknit technology for comfort and support. Air cushioning sole ensures responsive performance, ideal for athletes and fashion enthusiasts seeking style and functionality.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/air-vapormax-2023-flyknit-mens-shoes-vSm5p2.png' 
        },
        {
        "owner_id": 2,
        "name": "Air Jordan 1 Low",
        "type": "Lifestyle Shoe",
        "price": 115,
        "description": "Air Jordan 1 Low combines iconic design with modern comfort, featuring a timeless low-top silhouette. With premium leather construction and classic Nike Air cushioning, it delivers durability and style",
        "gender": 'Female',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/air-jordan-1-low-womens-shoes-rJrHLw.jpeg' 
        },
        {
        "owner_id": 2,
        "name": "Nike Killshot 2 Leather",
        "type": "Lifestyle Shoe",
        "price": 90,
        "description": "Nike Killshot 2 Leather offers a blend of retro aesthetics and contemporary comfort. Crafted with premium leather and a cushioned insole, it combines style with functionality, making it ideal.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/killshot-2-leather-mens-shoes-72M7D1+(1).png' 
        },
        {
        "owner_id": 2,
        "name": "Air Jordan 1 Retro High OG Latte",
        "type": "Lifestyle Shoe",
        "price": 180,
        "description": "Air Jordan 1 Retro High OG Latte delivers a timeless blend of classic design and modern flair. Featuring a premium leather upper in a soothing latte color scheme, it exudes sophistication. Ideal for both casual wear",
        "gender": 'Female',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/air-jordan-1-retro-high-og-latte-womens-shoes-Dw2wdP.png' 
        },

        {
        "owner_id": 3,
        "name": "Nike InfinityRN 4",
        "type": "Running Shoe",
        "price": 160,
        "description": "Nike InfinityRN 4: Designed for daily runs, it offers comfort and support with React foam cushioning, an engineered mesh upper for breathability, and a supportive design for stability, perfect for runners enhancing",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/infinityrn-4-mens-road-running-shoes-hlqHFQ.png' 
        },
        {
        "owner_id": 3,
        "name": "Nike Streakfly",
        "type": "Running Shoe",
        "price": 170,
        "description": "Nike Streakfly: Engineered for competitive runners, this shoe maximizes speed and agility with lightweight materials and a responsive midsole. Its sleek, aerodynamic silhouette enhances performance, perfect for setting",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/streakfly-road-racing-shoes-8rTxtR.png' 
        },
        {
        "owner_id": 3,
        "name": "Nike Mercurial Superfly 9 Elite",
        "type": "Running Shoe",
        "price": 285,
        "description": "Nike Mercurial Superfly 9 Elite: Engineered for elite soccer players, this cleat offers lightweight agility, seamless fit, and explosive traction for dominating the field.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/mercurial-superfly-9-elite-fg-high-top-soccer-cleats-sb8gJK.png' 
        },
        {
        "owner_id": 3,
        "name": "Nike Air Max 270",
        "type": "Running Shoe",
        "price": 160,
        "description": "Nike Air Max 270: Engineered for comfort and style, featuring a large Air Max unit for responsive cushioning. With a breathable mesh upper and lightweight construction.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/air-max-270-mens-shoes-KkLcGR.png' 
        },
        {
        "owner_id": 4,
        "name": "Tatum 2 Legacy",
        "type": "Basketball Shoe",
        "price": 125,
        "description": "Tatum 2 Legacy: Crafted for versatility and performance, this shoe boasts responsive cushioning and a supportive fit. Designed with durable materials and a sleek profile, it combines style with functionality.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/tatum-2-legacy-basketball-shoes-8XGVH8.jpeg' 
        },
        {
        "owner_id": 4,
        "name": "Nike Metcon 9",
        "type": "Running Shoe",
        "price": 150,
        "description": "Nike Metcon 9: Built for strength and endurance training, it combines stability, responsive cushioning, and durable traction for intense workouts, ensuring optimal performance and comfort.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/metcon-9-mens-workout-shoes-Tc42zx.png' 
        },
        {
        "owner_id": 4,
        "name": "Nike Invincible 3",
        "type": "Running Shoe",
        "price": 190,
        "description": "Nike Invincible 3: Engineered for long-distance running, it features React foam cushioning for a plush, responsive feel. The Flyknit upper offers breathability and support, while the design maximizes comfort.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/invincible-3-mens-road-running-shoes-6MqQ72.jpeg' 
        },
        {
        "owner_id": 4,
        "name": "Nike Vaporfly 3",
        "type": "Running Shoe",
        "price": 270,
        "description": "Built for road racing, this shoe combines lightweight construction with ZoomX foam for energy return. The aerodynamic design enhances speed, while the responsive cushioning supports endurance.",
        "gender": 'Male',
        "size": "6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14",
        "clothing_type": 'Shoes',
        "product_image": 'https://zike-bucketl.s3.us-east-2.amazonaws.com/zike-images/vaporfly-3-mens-road-racing-shoes-8DD182.png' 
        },

        
        

]
   



    [db.session.add(Product(**product)) for product in products]
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()