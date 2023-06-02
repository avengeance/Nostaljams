from app.models.images import db, SongImage, environment, SCHEMA
from sqlalchemy.sql import text

# Add Images to songs
def seed_song_images():
    song1 = SongImage(
        song_id='1',img_url='https://images.pexels.com/photos/3771842/pexels-photo-3771842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    )
    song2 = SongImage(
        song_id='2',img_url='https://www.rhino.com/sites/g/files/g2000012691/files/styles/article_image/public/2018-04/areathrespect.jpg?itok=nTWiwyXz'
    )
    song3 = SongImage(
        song_id='3',img_url='https://lastfm.freetls.fastly.net/i/u/500x500/b2434f624d4f465cc6145dfb4751942c.jpg'
    )
    song4 = SongImage(
        song_id='4',img_url='https://www.thepalacetheatre.org/wp-content/uploads/2019/07/Rumours2019.jpg'
    )
    song5 = SongImage(
        song_id='5',img_url='https://upload.wikimedia.org/wikipedia/en/d/d8/Hey_Ya_single_cover.png'
    )
    song6 = SongImage(
        song_id='6',img_url='https://upload.wikimedia.org/wikipedia/en/9/9f/Bohemian_Rhapsody.png'
    )
    song7 = SongImage(
        song_id='7',img_url='https://media.gq.com/photos/564f92c8dc7b324869a6ec18/master/w_3000,h_2000,c_limit/GettyImages-104037857.jpg'
    )
    song8 = SongImage(
        song_id='8',img_url='https://upload.wikimedia.org/wikipedia/en/1/17/Wonderwall_cover.jpg'
    )
    song9 = SongImage(
        song_id='9',img_url='https://static.stereogum.com/uploads/2020/02/Chic-Good-Times-1581536590.jpg'
    )
    song10 = SongImage(
        song_id='10',img_url='https://i.scdn.co/image/ab67616d0000b2734dd033f4cf3a0a58059cde69'
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM song_images"))

    db.session.commit()
