from flask import Blueprint, jsonify
from flask_login import login_required, current_user
# from app.models import User, SongImage, Comment, SongLike
from ..models.db import db
from ..models.song import Song
from ..models.images import SongImage
from ..models.comment import Comment
from ..models.likes import SongLike
from ..models.user import User
from ..models.playlist import Playlist

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#view all user songs
@user_routes.route('/<int:id>/songs', method=['GET'])
def get_user_songs(id):
    # we need to match the id from the params to our user id
    user = User.query.get(id)
    if (user):
        songs_list = []
        for song in user.songs:
            song_dict = song.to_dict()
            song_dict["SongImage"] = {
                "id": song.song_images[0].id if song.song_images else None,
                "img_url": song.song_images[0].img_url if song.song_images else None
            }
            song_dict["SongCommentsCnt"] = song.comments.count()
            song_dict["SongLikesCnt"] = song.song_likes.count()
            songs_list.append(song_dict)

        res = {
            "UserSongs": songs_list
        }
        return jsonify(res), 200
    else:
        res = {
            "message": "User couldn't be found",
            "statusCode": 404
        }
        return jsonify(res), 404

#view all playlists by user
@user_routes.route('/<int:id>/playlists', method=['GET'])
def view_user_playlists(user_id):
    if user_id != current_user.id:
        return jsonify({
            "message": "User couldn't be found",
            "statusCode": 404
        }), 404

    user_playlists = Playlist.query.filter_by(user_id=user_id).all()

    playlists_list = [playlist.to_dict() for playlist in user_playlists]

    return jsonify(playlists_list), 200


#view all playlists by playlist id
@user_routes.route('/<int:id>/playlists/<int:id>', method=['GET'])
def fxn():
    pass

#create new playlist
@user_routes.route('/<int:id>/playlists/new', method=['POST'])
def fxn():
    pass

#update playlist
@user_routes.route('/<int:id>/playlists/<int:id>', method=['PUT'])
def update_playlist(id):
    pass

#delete playlist
@user_routes.route('/<int:id>/playlists/<int:id>/delete', method=['DELETE'])
def fxn():
    pass
