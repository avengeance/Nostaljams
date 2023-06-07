from app.models.playlist import db, PlaylistSong, environment, SCHEMA
from sqlalchemy.sql import text

# Adds songs to the Playlist
def seed_playlist_songs():
    # playlist1 = PlaylistSong(
    #     song_id=['song_id_1','song_id_2','song_id_3'],playlist_id='1'
    # )
    # playlist2 = PlaylistSong(
    #     song_id=['song_id_2','song_id_3','song_id_4'],playlist_id='2'
    # )
    # playlist3 = PlaylistSong(
    #     song_id=['song_id_5','song_id_6','song_id_7'],playlist_id='3'
    # )
    # playlist4 = PlaylistSong(
    #     song_id=['song_id_3','song_id_8','song_id_9'],playlist_id='4'
    # )
    # playlist5 = PlaylistSong(
    #     song_id=['song_id_10','song_id_3','song_id_4'],playlist_id='5'
    # )
    # playlist6 = PlaylistSong(
    #     song_id=['song_id_6','song_id_9','song_id_3'],playlist_id='6'
    # )
    # playlist7 = PlaylistSong(
    #     song_id=['song_id_2','song_id_4','song_id_7'],playlist_id='7'
    # )
    # playlist8 = PlaylistSong(
    #     song_id=['song_id_1','song_id_2','song_id_4'],playlist_id='8'
    # )
    # playlist9 = PlaylistSong(
    #     song_id=['song_id_3','song_id_6','song_id_9'],playlist_id='9'
    # )
    playlist1 = PlaylistSong(song_id='song_id_1', playlist_id='1')
    playlist2 = PlaylistSong(song_id='song_id_2', playlist_id='1')
    playlist3 = PlaylistSong(song_id='song_id_3', playlist_id='1')
    playlist4 = PlaylistSong(song_id='song_id_2', playlist_id='2')
    playlist5 = PlaylistSong(song_id='song_id_3', playlist_id='2')
    playlist6 = PlaylistSong(song_id='song_id_4', playlist_id='2')

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
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM playlist_songs"))

    db.session.commit()
