from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField,SubmitField


class PlaylistForm(FlaskForm):
    user_id=IntegerField("User ID")
    name=StringField("Name")
    description=StringField("Description")
    submit=SubmitField("Submit")

class PlaylistSongForm(FlaskForm):
    song_id = IntegerField("Song ID")
    playlist_id = IntegerField("Playlist ID")
