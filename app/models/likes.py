from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class SongLike(db.Model):
    __tablename__='song_likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)

    users = db.relationship('User', back_populates='song_likes')
    # songs = db.relationship('Song', back_populates='song_likes')
    songs = db.relationship('Song', back_populates='song_likes')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'songId': self.song_id
        }

class PlaylistLike(db.Model):
    __tablename__='playlist_likes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')), nullable=False)

    users = db.relationship('User', back_populates='playlist_likes')
    playlists = db.relationship('Playlist', back_populates='playlist_likes')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'playlistId': self.playlist_id
        }
