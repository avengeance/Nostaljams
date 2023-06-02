from app.models.likes import db, SongLike, environment, SCHEMA
from sqlalchemy.sql import text

# Add likes to Songs
def seed_song_likes():
    song1 = SongLike(
        user_id='1',song_id='1'
    )
    song2 = SongLike(
        user_id='1',song_id='2'
    )
    song3 = SongLike(
        user_id='1',song_id='3'
    )
    song4 = SongLike(
        user_id='1',song_id='6'
    )
    song5 = SongLike(
        user_id='1',song_id='7'
    )
    song6 = SongLike(
        user_id='1',song_id='8'
    )
    song7 = SongLike(
        user_id='1',song_id='9'
    )
    song8 = SongLike(
        user_id='2',song_id='3'
    )
    song9 = SongLike(
        user_id='2',song_id='4'
    )
    song10 = SongLike(
        user_id='2',song_id='6'
    )
    song11 = SongLike(
        user_id='2',song_id='7'
    )
    song12 = SongLike(
        user_id='2',song_id='8'
    )
    song13 = SongLike(
        user_id='2',song_id='9'
    )
    song14 = SongLike(
        user_id='2',song_id='10'
    )
    song15 = SongLike(
        user_id='3',song_id='3'
    )
    song16 = SongLike(
        user_id='3',song_id='4'
    )
    song17 = SongLike(
        user_id='3',song_id='5'
    )
    song18 = SongLike(
        user_id='3',song_id='6'
    )
    song19 = SongLike(
        user_id='3',song_id='7'
    )
    song20 = SongLike(
        user_id='3',song_id='8'
    )
    song21 = SongLike(
        user_id='3',song_id='10'
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
    db.session.add(song11)
    db.session.add(song12)
    db.session.add(song13)
    db.session.add(song14)
    db.session.add(song15)
    db.session.add(song16)
    db.session.add(song17)
    db.session.add(song18)
    db.session.add(song19)
    db.session.add(song20)
    db.session.add(song21)

    db.session.commit()


def undo_song_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM song_likes"))

    db.session.commit()
