from app.models.images import db, SongImage, environment, SCHEMA
from sqlalchemy.sql import text

# Add Images to songs
def seed_song_images():
    song1 = SongImage(
        song_id=1,img_url='https://aa-projectbucket.s3.amazonaws.com/pexels-photo-3971985.jpeg'
    )
    song2 = SongImage(
        song_id=2,img_url='https://aa-projectbucket.s3.amazonaws.com/R-9590310-1483290080-8512.jpg'
    )
    song3 = SongImage(
        song_id=3,img_url='https://aa-projectbucket.s3.amazonaws.com/R-440998-1625045908-9541.jpg'
    )
    song4 = SongImage(
        song_id=4,img_url='https://aa-projectbucket.s3.amazonaws.com/R-2407280-1345666533-2524.jpg'
    )
    song5 = SongImage(
        song_id=5,img_url='https://aa-projectbucket.s3.amazonaws.com/R-205420-1598205013-7521.jpg'
    )
    song6 = SongImage(
        song_id=6,img_url='https://aa-projectbucket.s3.amazonaws.com/R-7781370-1448690705-7358.jpg'
    )
    song7 = SongImage(
        song_id=7,img_url='https://aa-projectbucket.s3.amazonaws.com/R-7818900-1449436150-4116.jpg'
    )
    song8 = SongImage(
        song_id=8,img_url='https://aa-projectbucket.s3.amazonaws.com/R-602444-1235738880.jpg'
    )
    song9 = SongImage(
        song_id=9,img_url='https://aa-projectbucket.s3.amazonaws.com/R-7888572-1450978021-3699.jpg'
    )
    song10 = SongImage(
        song_id=10,img_url='https://aa-projectbucket.s3.amazonaws.com/R-969718-1272902137.jpg'
    )

    db.session.add(song1)
    db.session.add(song2)
    db.session.add(song3)
    db.session.add(song4)
    db.session.add(song5)
    db.session.add(song6)
    db.session.add(song7)
    db.session.add(song8)
    db.session.add(song9)
    db.session.add(song10)

    db.session.commit()

def undo_song_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.song_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM song_images"))

    db.session.commit()
