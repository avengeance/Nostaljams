from app.models.images import db, UserImage, environment, SCHEMA
from sqlalchemy.sql import text

# Add user profile image
def seed_user_images():
    user1 = UserImage(
        user_id=1,img_url='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',is_Banner=False
    )
    user2 = UserImage(
        user_id=2,img_url='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',is_Banner=True
    )
    user3 = UserImage(
        user_id=3,img_url='https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg',is_Banner=True
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
