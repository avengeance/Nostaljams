from ..forms.comment_form import CommentForm
from flask import Blueprint, redirect, url_for, render_template, jsonify, request
from flask_login import login_required, current_user, logout_user
from ..models.comment import Comment
from .. import db

comment_routes = Blueprint('comments', __name__)

#update comment
@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)

    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404

    if comment.user_id != current_user.id:
        return jsonify({'error': 'You do not have permission to update this comment'}), 403

    form = CommentForm()
    form.csrf_token.data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.comment.data
        db.session.commit()

        comment_dict = comment.to_dict()
        # comment_dict['user'] = current_user.to_dict()

        return jsonify(comment_dict), 200
    else:
        return jsonify(form.errors), 400

#delete comment
@comment_routes.route('/<int:comment_id>/delete', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment is None:
        return jsonify({'error': 'Comment not found'}), 404

    if comment.user_id != current_user.id:
        return jsonify({'error': 'You do not have permission to delete this comment'}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({'message': 'Comment deleted successfully'}), 200
