from ..models import Song
from ..models.db import db
from ..models.likes import PlaylistLike
from ..models.playlist import Playlist, PlaylistSong
from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user

# AWS Helpers
from .aws import (create_presigned_url)

playlist_routes = Blueprint('playlists', __name__)

#view likes by playlist Id
@playlist_routes.route('/<int:playlist_id>/likes', methods=['GET'])
def get_playlist_likes(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    if(playlist):
        likes = PlaylistLike.query.filter(PlaylistLike.playlist_id == playlist_id)
        return jsonify([like.to_dict() for like in likes]),200
    else:
        res = {
            "message": "Playlist couldn't be found",
            "statusCode": 404
        }
        return jsonify(res), 404

@playlist_routes.route('/<int:playlist_id>', methods=['GET'])
def view_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)
    if playlist is None:
        return jsonify({
            'Error': 'Playlist not found',
            'status': 404
        }), 404
    
    playlist_data = playlist.to_dict()

    return jsonify(playlist_data), 200

@playlist_routes.route('/<int:playlistId>/songs', methods=['POST'])
def add_song_to_playlist(playlistId):
    # Retrieve songId from the request body
    songId = request.json.get('songId')

    playlist = Playlist.query.get(playlistId)
    if playlist is None:
        return jsonify({
            'Error': 'Playlist not found',
            'status': 404
        }), 404

    playlistAddSong = PlaylistSong(song_id=songId, playlist_id=playlistId)
    db.session.add(playlistAddSong)
    try:
        db.session.commit()
    except Exception as e:
        print(f"Error committing to the database: {str(e)}")


    return jsonify(playlistAddSong.to_dict()), 201

#delete song from playlist
@playlist_routes.route('/<int:playlistId>/songs/<int:songId>/delete', methods=['DELETE'])
def remove_song_from_playlist(playlistId, songId):
    playlist = Playlist.query.get(playlistId)

    if playlist is None:
        return jsonify({
            'Error': 'Playlist not found',
            'status': 404
        }), 404
    # playlistDeleteSong = PlaylistSong.query.get(songId)
    playlistSong = PlaylistSong.query.filter(PlaylistSong.song_id==songId, PlaylistSong.playlist_id==playlistId).first()
    if playlistSong is None:
        return jsonify({
            'Error': 'Song not found in the playlist',
            'status': 404
        }), 404

    db.session.delete(playlistSong)
    db.session.commit()

    return jsonify(playlistSong.to_dict()), 201


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
@login_required
def delete_playlist_like(id, like_id):
    playlist_like = PlaylistLike.query.get(like_id)
    playlist = Playlist.query.get(id)

    if(playlist):
        if playlist_like is None:
            return jsonify({'error': 'Playlist like not found'}), 404

        if playlist_like.user_id != current_user.id:
            return jsonify({'error': 'You do not have permission to delete this playlist like'}), 403

        db.session.delete(playlist_like)
        db.session.commit()

        return jsonify({'message': 'Playlist like deleted successfully'}), 200
    else:
        res = {
            "message": "Playlist couldn't be found",
            "statusCode": 404
        }
        return jsonify(res), 404

#delete playlist
@playlist_routes.route('/<int:playlist_id>/delete', methods=['DELETE'])
@login_required
def delete_playlist(playlist_id):
    playlist = Playlist.query.get(playlist_id)

    if playlist is None:
        return jsonify({'error': 'Playlist not found'}), 404

    if playlist.user_id != current_user.id:
        return jsonify({
            "message": "You do not have permission to delete this playlist",
            "statusCode": 404
        }), 404


    db.session.delete(playlist)
    db.session.commit()

    return jsonify({'message': 'Playlist deleted successfully'}), 200
