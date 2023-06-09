from app.models.playlist import db, PlaylistSong, environment, SCHEMA
from sqlalchemy.sql import text

# Adds songs to the Playlist
def seed_playlist_songs():
    playlist1 = PlaylistSong(
        song_id=1,playlist_id=1
    )
    playlist2 = PlaylistSong(
        song_id=2,playlist_id=2
    )
    playlist3 = PlaylistSong(
        song_id=6,playlist_id=3
    )
    playlist4 = PlaylistSong(
        song_id=8,playlist_id=4
    )
    playlist5 = PlaylistSong(
        song_id=3,playlist_id=5
    )
    playlist6 = PlaylistSong(
        song_id=9,playlist_id=6
    )
    playlist7 = PlaylistSong(
        song_id=4,playlist_id=7
    )
    playlist8 = PlaylistSong(
        song_id=2,playlist_id=8
    )
    playlist9 = PlaylistSong(
        song_id=6,playlist_id=9
    )

    db.session.add(playlist1)
    db.session.add(playlist2)
    db.session.add(playlist3)
    db.session.add(playlist4)
    db.session.add(playlist5)
    db.session.add(playlist6)
    # db.session.add(playlist7)
    # db.session.add(playlist8)
    # db.session.add(playlist9)

    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
