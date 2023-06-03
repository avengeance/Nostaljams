from flask_wtf import FlaskForm
from wtforms import StringField,HiddenField, SubmitField
from wtforms.validators import DataRequired, ValidationError

class CommentForm(FlaskForm):
    comment = StringField('comment')
    song_id = HiddenField('song_id')
    submit=SubmitField('Submit')

class EditCommentForm(FlaskForm):
    comment = StringField('comment')
    song_id = HiddenField('song_id')
    submit=SubmitField('Submit')
