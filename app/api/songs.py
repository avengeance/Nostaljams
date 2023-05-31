from ..models import Song, SongImage, SongLike, Comment, db
from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user, logout_user

bp = Blueprint('songs', __name__)

# view all songs
@bp.route('/', methods=['GET'])
def fxn():
    pass

#view song by song id
@bp.route('/<int:id>', methods=['GET'])
def song_detail(id):
    # Retrieve the song details from the database
    song = Song.query.find_one({"song_id": song_id})
    # Check if the song exists in the database
    if(song):
    # Print the song details
        image = SongImage.query.find_one({"song_id": id})
        likes = SongLike.query.find_one({"song_id": id})
        comments = Comment.query.find_one({"song_id": id})

        res = {
            "songId": song['song_id'],
            "userId": song['userId'],
            "name": song['name'],
            "artists": song['artists'],
            "genre": song['genre'],
            "description": song['description'],
            "SongImage": image['img_url'],
            "SongLikesCnt": likes['id'],
            "SongComments": comments['comment']
        }

        # print("Song ID:", song['song_id'])
        # print("User ID:", song['userId'])
        # print("Song Title:", song['name'])
        # print("Artists:", song['artists'])
        # print('Genre:', song['genre'])
        # print('Description:', song['description'])
        # print('Audio Url:', song['audio_url'])
        # print('Song Image:', song['SongImages'])
        # print('Song Likes', song['SongLikesCnt'])
        # print('Song Comments', song['SongComments'])

        return jsonify(res), 200

    else:
        # err.response.status_code == 404:
        # print("Song does not exist")
        res = {
            "message": "Song could not be found.",
            "statusCode": 404
        }

        return jsonify(res), 404

#create new song
@bp.route('/new', methods=['POST'])
def fxn():
    pass

#update a song
@bp.route('/<int:id>', methods=['PUT'])
@login_required
def update_song(id):
    # Check if the song being updated is by the owner
    user = User.query.find({"userId": id})
    # Create a variable for the update song form
        #placeholder
        # form = SongForm()
    # Conditional if validates on submit
    pass

#delete a song
@bp.route('/<int:id>/delete', methods=['DELETE'])
def fxn():
    pass

#view songs by comment id
@bp.route('/<int:id>/comments', methods=['GET'])
def fxn():
    pass

#create new song comment
@bp.route('/<int:id>/comments/new', methods=['POST'])
def fxn():
    pass

#update comment
@bp.route('/<int:id>/comments/<int:id>', methods=['PUT'])
def fxn():
    pass

#delete comment
@bp.route('/<int:id>/comments/<int:id>/delete', methods=['DELETE'])
def fxn():
    pass

#view likes by song Id
@bp.route('/<int:id>/likes', methods=['GET'])
def fxn():
    pass

#view likes by song Id
@bp.route('/<int:id>/likes', methods=['GET'])
def fxn():
    pass

#create a new like
@bp.route('/<int:id>/likes/new', methods=['POST'])
def fxn():
    pass

#delete a like
@bp.route('/<int:id>/likes/<int:id>/delete', methods=['DELETE'])
def fxn():
    pass
