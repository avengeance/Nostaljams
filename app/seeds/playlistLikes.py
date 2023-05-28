from app.models import db, PlaylistLike, environment, SCHEMA
from sqlalchemy.sql import text

# Adds likes to Playlist
def seed_playlist_likes():
    playlist_like1 = PlaylistLike(
        user_id='1',playlist_id='1'
    )
    playlist_like2 = PlaylistLike(
        user_id='1',playlist_id='2'
    )
    playlist_like3 = PlaylistLike(
        user_id='1',playlist_id='3'
    )
    playlist_like4 = PlaylistLike(
        user_id='2',playlist_id='5'
    )
    playlist_like5 = PlaylistLike(
        user_id='2',playlist_id='6'
    )
    playlist_like6 = PlaylistLike(
        user_id='3',playlist_id='7'
    )
    playlist_like7 = PlaylistLike(
        user_id='3',playlist_id='9'
    )

    db.session.add(playlist_like1)
    db.session.add(playlist_like2)
    db.session.add(playlist_like3)
    db.session.add(playlist_like4)
    db.session.add(playlist_like5)
    db.session.add(playlist_like6)
    db.session.add(playlist_like7)
    db.session.add(playlist_like8)
    db.session.add(playlist_like9)

    db.session.commit()


def undo_playlist_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_likes"))
        
    db.session.commit()
