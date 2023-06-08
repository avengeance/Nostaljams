from ..models import Song
from ..models.db import db
from ..models.likes import PlaylistLike
from flask import Blueprint, redirect, url_for, render_template, jsonify
from flask_login import login_required, current_user, logout_user

playlist_routes = Blueprint('playlists', __name__)

#view likes by playlist Id
@playlist_routes.route('/<int:id>/likes', methods=['GET'])
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
@playlist_routes.route('/<int:id>/likes/new', methods=['POST'])
@login_required
def create_playlist_like(id):
    user_id = current_user.id

    existing_like = PlaylistLike.query.filter_by(user_id=user_id, playlist_id=id).first()
    if existing_like:
        return jsonify({'error': 'You already like this playlist'}), 400

    playlist_like = PlaylistLike(user_id=user_id, playlist_id=id)
    db.session.add(playlist_like)
    db.session.commit()
    return jsonify(playlist_like.to_dict()), 201

@playlist_routes.route('/<int:id>/likes/<int:like_id>/delete', methods=['DELETE'])
def delete_playlist_like(id, like_id):
    playlist_like = PlaylistLike.query.get(like_id)
    if playlist_like is None:
        return jsonify({'error': 'Playlist like not found'}), 404

    if playlist_like.user_id != current_user.id:
        return jsonify({'error': 'You do not have permission to delete this playlist like'}), 403

    db.session.delete(playlist_like)
    db.session.commit()

    return jsonify({'message': 'Playlist like deleted successfully'}), 200
