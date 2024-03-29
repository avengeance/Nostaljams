from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
# from app.models import User, SongImage, Comment, SongLike
from ..models.db import db
from ..models.song import Song
from ..models.images import SongImage
from ..models.comment import Comment
from ..models.likes import SongLike
from ..models.user import User
from ..models.playlist import Playlist
from sqlalchemy import func
user_routes = Blueprint('users', __name__)

# AWS Helpers
from .aws import (create_presigned_url)

@user_routes.route('/')
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

@user_routes.route('/<username>')
def check_username(username):
    user = User.query.filter(func.lower(User.username) == username.lower()).first()
    exists = True if user else False
    return {'exists': exists}

@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#view all user songs
@user_routes.route('/<int:id>/songs', methods=['GET'])
def get_user_songs(id):
    # we need to match the id from the params to our user id
    user = User.query.get(id)
    if (user):
        songs_list = []
        for song in user.songs:
            if song.song_images[0].img_url:
                parsed_image_url = song.song_images[0].img_url.rsplit("/", 1)[-1]
                presigned_image_url = create_presigned_url(parsed_image_url)
                song.song_images[0].img_url = presigned_image_url

            song_dict = song.to_dict()
            song_dict["SongImage"] = {
                "song_id": song.song_images[0].id if song.song_images else None,
                "img_url": song.song_images[0].img_url if song.song_images else None
            }
            song_dict["SongCommentsCnt"] = len(song.comments)
            song_dict["SongLikesCnt"] = len(song.song_likes)
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
@user_routes.route('/<int:user_id>/playlists', methods=['GET'])
def view_user_playlists(user_id):

    user = User.query.get(user_id)

    if (user):

        user_playlists = Playlist.query.filter_by(user_id=user_id).all()

        for playlist in user_playlists:
            for song in playlist.songs:
                if song.audio_url:
                    parsed_audio_url = song.audio_url.rsplit("/", 1)[-1]
                    presigned_audio_url = create_presigned_url(parsed_audio_url)
                    song.audio_url = presigned_audio_url
                    
                if(song):
                    parsed_image_url = song.song_images[0].img_url.rsplit("/", 1)[-1]
                    presigned_image_url = create_presigned_url(parsed_image_url)
                    song.song_images[0].img_url = presigned_image_url

        playlists_list = [playlist.to_dict() for playlist in user_playlists]
        return jsonify(playlists_list), 200

    else:
        res = {
            "message": "User couldn't be found",
            "statusCode": 404
        }
        return jsonify(res), 404



#create new playlist
@user_routes.route('/<int:id>/playlists/new', methods=['POST'])
@login_required
def create_playlist(id):
    user = User.query.get(id)
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    data = request.json
    name = data.get('name')
    description = data.get('description')

    if not name:
        return jsonify({'error': 'Name is required'}), 400

    playlist = Playlist(name=name, description=description, user_id=user.id)
    db.session.add(playlist)
    db.session.commit()

    playlist_data = playlist.to_dict()

    return jsonify(playlist_data), 201

#update playlist
@user_routes.route('/<int:id>/playlists/<int:playlist_id>/edit', methods=['PUT'])
def update_playlist(id, playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if playlist is None:
        return jsonify({'error': 'Playlist not found'}), 404

    data = request.json
    name = data.get('name')
    description = data.get('description')

    if name:
        playlist.name = name
    if description:
        playlist.description = description

    db.session.commit()

    playlist_data = playlist.to_dict()

    return jsonify(playlist_data), 200
