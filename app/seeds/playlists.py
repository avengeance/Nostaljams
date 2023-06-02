from app.models.playlist import db, Playlist, environment, SCHEMA
from sqlalchemy.sql import text

# Adds Playlists
def seed_playlist():
    playlist1 = Playlist(
        user_id='1',name='Daily',description='Daily playlist'
    )
    playlist2 = Playlist(
        user_id='1',name='Cruising',description='Driving in the car'
    )
    playlist3 = Playlist(
        user_id='1',name='Random',description='Random list of songs put together'
    )
    playlist4 = Playlist(
        user_id='2',name='Hip hop',description='My hip hop playlist'
    )
    playlist5 = Playlist(
        user_id='2',name='Shower songs',description='My shower songs to sing to'
    )
    playlist6 = Playlist(
        user_id='2',name='Whatevers',description='Random list of songs put together'
    )
    playlist7 = Playlist(
        user_id='3',name='Commute',description='When traffic hits this playlist starts.'
    )
    playlist8 = Playlist(
        user_id='3',name='Binge',description='A tasteful selection of songs.'
    )
    playlist9 = Playlist(
        user_id='3',name='Random',description='Random list of songs put together'
    )

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.add(playlist6)
    db.session.add(playlist7)
    db.session.add(playlist8)
    db.session.add(playlist9)

    db.session.commit()

def undo_playlists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlists"))

    db.session.commit()
