from app.models.images import db, SongImage, environment, SCHEMA
from sqlalchemy.sql import text

# Add Images to songs
def seed_song_images():
    song1 = SongImage(
        song_id=1,img_url='https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg'
    )
    song2 = SongImage(
        song_id=2,img_url='https://i.discogs.com/A7g-fTNPsuShlAMyn2MeUaGfSIWl-SPjpmxb_749fzs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk1OTAz/MTAtMTQ4MzI5MDA4/MC04NTEyLmpwZWc.jpeg'
    )
    song3 = SongImage(
        song_id=3,img_url='https://i.discogs.com/a8go4FwLfeSjzxOsrwY8EFliXSzeGxH8XwW34Ka7ACs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0MDk5/OC0xNjI1MDQ1OTA4/LTk1NDEuanBlZw.jpeg'
    )
    song4 = SongImage(
        song_id=4,img_url='https://i.discogs.com/BlRRQekARrH1Ei-cbVfYMZ9URp_5R5FB4bBOzaAj__k/rs:fit/g:sm/q:90/h:593/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI0MDcy/ODAtMTM0NTY2NjUz/My0yNTI0LmpwZWc.jpeg'
    )
    song5 = SongImage(
        song_id=5,img_url='https://i.discogs.com/PscbIK9-ow4fLrs4QoBWm4ZxEJtGJOEqpA5RPbnBw4Y/rs:fit/g:sm/q:90/h:600/w:584/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIwNTQy/MC0xNTk4MjA1MDEz/LTc1MjEuanBlZw.jpeg'
    )
    song6 = SongImage(
        song_id=6,img_url='https://i.discogs.com/8Y2X1aONMq6M19jMgaVp8TZ0n3gdoCKpLkcve8adsB8/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc3ODEz/NzAtMTQ0ODY5MDcw/NS03MzU4LmpwZWc.jpeg'
    )
    song7 = SongImage(
        song_id=7,img_url='https://i.discogs.com/t_AVKA1kxLthoymKtfr_kbUghZBy9-mVfoogX2HUWrc/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4MTg5/MDAtMTQ0OTQzNjE1/MC00MTE2LmpwZWc.jpeg'
    )
    song8 = SongImage(
        song_id=8,img_url='https://i.discogs.com/s_8RkCaK6Y9t5dUT56YPi882F9bWyR4EaQpUR9I1D5Y/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTYwMjQ0/NC0xMjM1NzM4ODgw/LmpwZWc.jpeg'
    )
    song9 = SongImage(
        song_id=9,img_url='https://i.discogs.com/zj5kMw01sUK8s5QMlXwdeeCUP6Sr5xZVJdRxDt3-YXg/rs:fit/g:sm/q:90/h:600/w:594/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4ODg1/NzItMTQ1MDk3ODAy/MS0zNjk5LmpwZWc.jpeg'
    )
    song10 = SongImage(
        song_id=10,img_url='https://i.discogs.com/XFlhrIZAnIIcir6d6nm5uU8kTCFaXmP_zQI29gqoBoU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk2OTcx/OC0xMjcyOTAyMTM3/LmpwZWc.jpeg'
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
