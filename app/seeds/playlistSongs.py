from app.models.playlist import db, PlaylistSong, environment, SCHEMA
from sqlalchemy.sql import text

# Adds songs to the Playlist
def seed_playlist_songs():
    playlist_song1 = PlaylistSong(
        song_id=1,playlist_id=1
    )
    playlist_song2 = PlaylistSong(
        song_id=2,playlist_id=2
    )
    playlist_song3 = PlaylistSong(
        song_id=6,playlist_id=3
    )
    playlist_song4 = PlaylistSong(
        song_id=8,playlist_id=4
    )
    playlist_song5 = PlaylistSong(
        song_id=3,playlist_id=5
    )
    playlist_song6 = PlaylistSong(
        song_id=9,playlist_id=6
    )
    playlist_song7 = PlaylistSong(
        song_id=4,playlist_id=7
    )
    playlist_song8 = PlaylistSong(
        song_id=2,playlist_id=8
    )
    playlist_song9 = PlaylistSong(
        song_id=6,playlist_id=9
    )

    db.session.add(playlist_song1)
    db.session.add(playlist_song2)
    db.session.add(playlist_song3)
    db.session.add(playlist_song4)
    db.session.add(playlist_song5)
    db.session.add(playlist_song6)
    db.session.add(playlist_song7)
    db.session.add(playlist_song8)
    db.session.add(playlist_song9)

    db.session.commit()

def undo_playlist_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
