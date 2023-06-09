from app.models.song import db, Song, environment, SCHEMA
from sqlalchemy.sql import text

# Adds demo songs
def seed_songs():
    demo = Song(
        name='Demo', user_id=1, artists='Demo',genre='Pop',description='Demo Song',audio_url='https://fakewebsite.com/demo-song'
    )
    respect = Song(
        name='Respect', user_id=1, artists='Aretha Franklin', genre='Soul',description='A declaration from a strong, confident woman, who believes she has everything her man wants and does not wrong him, while demanding his "respect in the form of appropriate levels of physical attention.', audio_url='https://fakewebsite.com/demo-song'
    )
    smells = Song(
        name='Smells Like Teen Spirit', user_id=1, artists='Nirvana',genre='Grunge',description='a teen revolution anthem',audio_url='https://fakewebsite.com/demo-song'
    )
    dreams = Song(
        name='Dreams', user_id=1, artists='Fleetwood Mac',genre='Soft Rock',description="A song about Stevie and Lindsey's relationship coming to an end",audio_url='https://fakewebsite.com/demo-song'
    )
    hey = Song(
        name='Hey Ya!', user_id=1, artists='Outkast',genre='Hip Hop',description="The state of relationships in the 2000s. It is about some people who stay together in relationships because of tradition, because somebody told them, 'You guys are supposed to stay together.'", audio_url='https://fakewebsite.com/demo-song'
    )
    queen = Song(
        name='Bohemian Rhapsody', user_id=1, artists='Queen',genre='Progressive Rock',description='Based on Faust Legend: A highly successful person yet dissatisfied with his life, which leads him to a pact with the Devil at a crossroads, exchanging his soul for unlimited knowledge and worldly pleasures', audio_url='https://fakewebsite.com/demo-song'
    )
    runaway = Song(
        name='Runaway', user_id=1, artists='Kanye West feat. Pusha T',genre='Hip Hop',description="Based on Kanye's relationships his arrogance, insecurity and sorrows",audio_url='https://fakewebsite.com/demo-song'
    )
    wonderwall = Song(
        name='Wonderwall', user_id=1, artists='Oasis',genre='Rock',description="A song about an imaginary friend who's gonna come and save you from yourself",audio_url='https://fakewebsite.com/demo-song'
    )
    good_times = Song(
        name='Good Times', user_id=1, artists='Chic',genre='Disco',description="The optimistic times of the late 70s",audio_url='https://fakewebsite.com/demo-song'
    )
    september = Song(
        name='September', user_id=1, artists='Earth, Wind, and Fire',genre='Disco',description="The date being a fun one between two lovers",audio_url="ttps://fakewebsite.com/demo-song"
    )

    db.session.add(demo)
    db.session.add(respect)
    db.session.add(smells)
    db.session.add(dreams)
    db.session.add(hey)
    db.session.add(queen)
    db.session.add(runaway)
    db.session.add(wonderwall)
    db.session.add(good_times)
    db.session.add(september)

    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM songs"))

    db.session.commit()
