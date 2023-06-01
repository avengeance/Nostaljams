from ..models.db import db
from ..models.song import Song
from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user, logout_user

bp = Blueprint('songs', __name__)

# view all songs
@bp.route('/', methods=['GET'])
def get_all_songs():
    songs = session.query(Song)



#view song by song id
@bp.route('/<int:id>', methods=['GET'])
def fxn():
    pass

#create new song
@bp.route('/new', methods=['POST'])
def fxn():
    pass

#update a song
@bp.route('/<int:id>', methods=['PUT'])
def fxn():
    pass

#delete a song
@bp.route('/<int:id>/delete', methods=['DELETE'])
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
