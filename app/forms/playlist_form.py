from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SubmitField


class PlaylistForm(FlaskForm):
    user_id=IntegerField("Title")
    name=StringField("Name")
    description=StringField("Description")
    submit=SubmitField("Submit")

class PlaylistSongForm(FlaskForm):
    song_id=StringField("test")
    playlist_id=StringField("test")
