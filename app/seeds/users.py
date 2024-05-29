from app.models import db, User, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text


demo_date = 'April 15, 1992'
marnie_date = 'August 23, 1985'
bobbie_date = 'January 7, 2003'
zach_date = 'April 19, 2004'

demo_final = datetime.strptime(demo_date, '%B %d, %Y').date()
marnie_final = datetime.strptime(marnie_date, '%B %d, %Y').date()
bobbie_final = datetime.strptime(bobbie_date, '%B %d, %Y').date()
zach_final = datetime.strptime(zach_date, '%B %d, %Y').date()


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        firstname='bot', lastname='bot', username='Demo', email='demo@gmail.com', birthday=demo_final, password='password')
    marnie = User(
        firstname='marnie', lastname='flowers', username='marnie', email='marnie@gmail.com', birthday=marnie_final, password='password')
    bobbie = User(
        firstname='bobbie', lastname='stomski', username='bobbie', email='bobbie@gmail.com', birthday=bobbie_final, password='password')
    zach = User(
        firstname='zach', lastname='wood', username='zavvn', email='zavvn@gmail.com', birthday=zach_final, password='zavvn101')
    

    
    
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(zach)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
