from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class UserImage(db.Model):
    __tablename__='user_images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    img_url = db.Column(db.String(255))
    is_Banner = db.Column(db.Boolean)

    users = db.relationship('User', back_populates='user_images')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'imgUrl': self.img_url,
            'isBanner': self.is_Banner
        }

class SongImage(db.Model):
    __tablename__='song_images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    img_url = db.Column(db.String(255))

    songs = db.relationship('Song', back_populates='song_images')

    def to_dict(self):
        return {
            'id': self.id,
            'songId': self.song_id,
            'imgUrl': self.img_url,
        }
