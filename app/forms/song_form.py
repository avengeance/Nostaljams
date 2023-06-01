from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    artists = StringField('artists', validators=[DataRequired()])
    genre = StringField('genre')
    description = StringField('description')
    audio_url = FileField('audio_url', validators=[DataRequired()])
