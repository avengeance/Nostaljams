from ..models import Song
from ..models.db import db
from ..models.likes import PlaylistLike
from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user, logout_user

bp = Blueprint('playlists', __name__)

#view likes by playlist Id
@bp.route('/<int:id>/likes', methods=['GET'])
def get_playlist_likes(id):
    playlist = PlaylistLike.query.get(id)
    if(playlist):
        return jsonify(playlist.to_dict()), 200
    else:
        res = {
            "message": "Playlist couldn't be found",
            "statusCode": 404
        }
        return jsonify(res), 404

#create new playlist like
@bp.route('/<int:id>likes/new', methods=['POST'])
def create_playlist_like(id):
    user_id = current_user.id
    playlist_like = PlaylistLike(user_id=user_id, playlist_id=id)
    db.session.add(playlist_like)
    db.session.commit()
    return jsonify(playlist_like.to_dict()), 201
