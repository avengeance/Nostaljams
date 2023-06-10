from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class PlaylistSong(db.Model):
    __tablename__ = 'playlist_songs'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')))
    playlist_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('playlists.id')))

    playlist = db.relationship('Playlist', back_populates='playlist_songs', lazy='subquery')

    def to_dict(self):
        return {
            'id': self.id,
            'songId': self.song_id,
            'playlistId': self.playlist_id
        }


# Assign the relationship after both classes are defined
Playlist.playlist_songs = db.relationship('PlaylistSong', back_populates='playlist', cascade='all, delete')
