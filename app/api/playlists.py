from ..models import Song
from flask import Blueprint, redirect, url_for, render_template
from flask_login import login_required, current_user, logout_user

bp = Blueprint('playlists', __name__)

#view likes by song Id
@bp.route('/<int:id>/likes', methods=['GET'])
def fxn():
    pass
