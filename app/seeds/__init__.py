from flask.cli import AppGroup
from .users import seed_users, undo_users
from .comment import seed_comments, undo_comments
from .playlistLikes import seed_playlist_likes, undo_playlist_likes
from .playlists import seed_playlist, undo_playlists
from .playlistSongs import seed_playlist_songs, undo_playlist_songs
from .songImage import seed_song_images, undo_song_images
from .songLikes import seed_song_likes, undo_song_likes
from .songs import seed_songs, undo_songs
from .userImage import seed_user_images, undo_user_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.song_likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlists RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.song_images RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.playlist_songs RESTART IDENTITY CASCADE;")
        db.session.commit()
    seed_users()
    seed_user_images()
    seed_playlist()
    seed_song_images()
    seed_song_likes()
    seed_songs()
    seed_comments()
    seed_playlist_likes()
    seed_playlist_songs()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_user_images()
    undo_song_images()
    undo_song_likes()
    undo_songs()
    undo_comments()
    undo_playlist_likes()
    undo_playlist_songs()
    undo_playlists()
