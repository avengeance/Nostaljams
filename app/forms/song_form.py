from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired

class SongForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    artists = StringField('artists', validators=[DataRequired()])
    genre = StringField('genre')
    description = StringField('description')
    audio_url = StringField('audio_url', validators=[DataRequired()])
    img_url = StringField('img_url')

class EditSongForm(FlaskForm):
    name=StringField("name")
    artists=StringField("artists")
    genre = StringField('genre')
    description = StringField('description')
    audio_url = FileField('audio_url')
    img_url = FileField('img_url')
