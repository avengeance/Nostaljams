from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Playlist(db.Model):
    
    __tablename__='playlists'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    users = db.relationship('User', back_populates='playlists')
    likes = db.relationship('PlaylistLike', back_populates='playlists')
    songs = db.relationship('Song', back_populates='playlists', secondary='playlist_songs', overlaps="playlist_songs", cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'name': self.name,
            'description': self.description,
            'songs': [song.to_dict() for song in self.songs],
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }


Playlist.playlist_songs = db.relationship('PlaylistSong', back_populates='playlist', cascade='all, delete')