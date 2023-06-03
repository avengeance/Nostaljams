from ..models.db import db
from ..models.song import Song
from ..models.images import SongImage
from ..models.comment import Comment
from ..models.likes import SongLike
from ..models.user import User
# from ..forms import SongForm
# from ..forms import CommentForm

from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user, logout_user

bp = Blueprint('songs', __name__)

# view all songs
@bp.route('/', methods=['GET'])
def get_all_songs():
    songs = Song.query.all()
    return {
        "Songs": [songs.to_dict()] for song in songs
    }

#view song by song id
@bp.route('/<int:id>', methods=['GET'])
def song_detail(id):
    # Retrieve the song details from the database
    song = Song.query.find_one({"song_id": id})
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
def create_song():
    pass

#update a song
@bp.route('/<int:id>', methods=['PUT'])
@login_required
def update_song(id):
    song = Song.query.get(id)
    if song and current_user.id == song.user_id:
        """

        all this code is to update the song in the database, but also theory

            """
        form = SongForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form = form.data['song']
            db.session.commit()
            return form.to_dict(), 200
        else:
            return jsonify(form.errors), 400

    else:
        res = {
            "message": "Song could not be found.",
            "statusCode": 404
        }
        return jsonify(res), 404

#delete a song
@bp.route('/<int:id>/delete', methods=['DELETE'])
@login_required
def delete_song():
    song = Song.query.get(id)
    if song and current_user.id == song.user_id:
        db.session.delete(song)
        db.session.commit()
        res = {
            "id": song.id,
            "message": "Successfully deleted",
            "statusCode": 200
        }
        return jsonify(res), 200
    else:
        res = {
            "message": "Song couldn't be found",
            "statusCode": 404
        }
        return jsonify(res), 404

#view songs by comment id
@bp.route('/<int:id>/comments', methods=['GET'])
def view_song_by_comment_id():
    pass

#create new song comment
@bp.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def new_comment():
    song = Song.query.get(id)
    if(song):
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            comment = Comment(
                comment=form.data['comment'],
            )
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict(), 200
        else:
            return jsonify(form.errors), 400
    else:
        res = {
            "message": "Song could not be found.",
            "statusCode": 404
        }
        return jsonify(res), 404


#update comment
@bp.route('/<int:id>/comments/<int:comment_id>', methods=['PUT'])
def update_comment(comment_id):
    # need a form var here that invokes our form for updating comment
    # need a line here for requesting csrf token
    comment = Comment.query.get(comment_id)
    user = User.query.get(current_user.id)
    user = user.to_dict()
    if comment.user_id == current_user.id:
        # need an if statement here that checks validate_on_submit
        # if form.validate_on_submit()
        # comment.body = form.data['body']
        db.session.comment()
        comment_dict = comment.to_dict()
        comment_dict['users'] = {
            # this is where we add our key and values for user info
        }
        return comment_dict
    return {
        # validation error here if comment does not exist
    }
    #another return statement here if user does not own the comment


#delete comment
@bp.route('/<int:id>/comments/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()

#view likes by song Id
@bp.route('/<int:id>/likes', methods=['GET'])
def view_likes_by_song_id(id):
    likes = SongLike.query.filter(SongLike.song_id == id)
    return jsonify([like.to_dict() for like in likes])

#view likes by song Id
@bp.route('/<int:id>/likes', methods=['GET'])
def song_likes(id):
    song = Song.query.get(id)
    if(song):
        # Get all the likes from the database
        comments = Comment.query.filter_by(song_id=id).all()
        res = {
            "message": "Successfully retrieved",
            "statusCode": 200,
            "comments": comments.to_dict()
        }
        return jsonify(res), 200
    else:
        res = {
            "message": "Song could not be found.",
            "statusCode": 404
        }
        return jsonify(res), 404

#create a new like
@bp.route('/<int:id>/likes/new', methods=['POST'])
def create_like(id):
    user_id = current_user.id
    new_like = SongLike(user_id=user_id, song_id=id)
    db.session.add(new_like)
    db.session.commit()
    return jsonify(new_like.to_dict()), 201

#delete a like
@bp.route('/<int:id>/likes/<int:like_id>/delete', methods=['DELETE'])
def delete_like():
    pass
