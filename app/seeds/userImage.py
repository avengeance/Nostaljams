from app.models.images import db, UserImage, environment, SCHEMA
from sqlalchemy.sql import text

# Add user profile image
def seed_user_images():
    user1 = UserImage(
        user_id='1',img_url='https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',is_Banner=False
    )
    user2 = UserImage(
        user_id='2',img_url='https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',is_Banner=True
    )
    user3 = UserImage(
        user_id='3',img_url='https://images.pexels.com/photos/556669/pexels-photo-556669.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',is_Banner=True
    )

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)

    db.session.commit()

def undo_user_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_images"))

    db.session.commit()
