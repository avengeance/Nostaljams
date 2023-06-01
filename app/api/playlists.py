from ..models import Song
from ..models.likes import PlaylistLike
from flask import Blueprint, redirect, url_for, render_template
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
