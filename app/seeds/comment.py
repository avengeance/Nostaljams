from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text

# Add comments
def seed_comments():
    demo_comment1 = Comment(
        user_id='1',song_id='1',comment='This is one of my favorite songs.'
    )
    demo_comment2 = Comment(
        user_id='2',song_id='1',comment='A always place this song waking up.'
    )
    demo_comment3 = Comment(
        user_id='3',song_id='1',comment='I cannot believe I did not find this song sooner!'
    )
    demo_comment4 = Comment(
        user_id='1',song_id='2',comment='Probably my favorite song by this singer.'
    )
    demo_comment5 = Comment(
        user_id='2',song_id='2',comment='That bassline always hits.'
    )
    demo_comment6 = Comment(
        user_id='3',song_id='2',comment='Sock it to me. Sock it to me. Sock it to me.'
    )
    demo_comment7 = Comment(
        user_id='1',song_id='3',comment='I love banging my head to this song.'
    )
    demo_comment8 = Comment(
        user_id='2',song_id='3',comment='Reminds me of my punk rock days.'
    )
    demo_comment9 = Comment(
        user_id='3',song_id='3',comment='A timeless classic.'
    )
    demo_comment10 = Comment(
        user_id='1',song_id='4',comment='This was my wedding song.'
    )
    demo_comment11 = Comment(
        user_id='2',song_id='4',comment='There is no way you can listen to this song and not get the feels.'
    )
    demo_comment12 = Comment(
        user_id='3',song_id='4',comment="Stevie's vocals on this are just heavenly."
    )
    demo_comment13 = Comment(
        user_id='1',song_id='5',comment='Shake it like a polaroid picture!'
    )
    demo_comment14 = Comment(
        user_id='2',song_id='5',comment='An upbeat song with some depressing lyrics.'
    )
    demo_comment15 = Comment(
        user_id='3',song_id='5',comment='What better song to play in the car and singing out loud'
    )
    demo_comment16 = Comment(
        user_id='1',song_id='6',comment="Wanye's World anyone or am I just that old?"
    )
    demo_comment17 = Comment(
        user_id='2',song_id='6',comment='The perfect song to sing with a few drinks and a group of people.'
    )
    demo_comment18 = Comment(
        user_id='3',song_id='6',comment='One of the most known Queen songs that is out there.'
    )
    demo_comment19 = Comment(
        user_id='1',song_id='7',comment='This song really hits you right in the heart when that beginning note plays.'
    )
    demo_comment20 = Comment(
        user_id='2',song_id='7',comment='When Kanye drops that autotune part it just hits different.'
    )
    demo_comment21 = Comment(
        user_id='3',song_id='7',comment='Pusha T has a really good verse on this song.'
    )
    demo_comment22 = Comment(
        user_id='1',song_id='8',comment='Do not place this song in any guitar store.'
    )
    demo_comment23 = Comment(
        user_id='2',song_id='8',comment='One of the first songs anybody learns to play on the guitar.'
    )
    demo_comment24 = Comment(
        user_id='3',song_id='8',comment='The song to sing in the shower anyone?'
    )
    demo_comment25 = Comment(
        user_id='1',song_id='9',comment='The funkiest bassline known to man.'
    )
    demo_comment26 = Comment(
        user_id='2',song_id='9',comment='I have been looking for this song forever!'
    )
    demo_comment27 = Comment(
        user_id='3',song_id='9',comment='How can you listen to this song sitting down? It is impossible.'
    )
    demo_comment28 = Comment(
        user_id='1',song_id='10',comment='Do you remember the 21st of September?'
    )
    demo_comment29 = Comment(
        user_id='2',song_id='10',comment='Baa dee ya dee ya'
    )
    demo_comment30 = Comment(
        user_id='3',song_id='10',comment="This is my friend's favorite song."
    )

    db.session.add(demo_comment1)
    db.session.add(demo_comment2)
    db.session.add(demo_comment3)
    db.session.add(demo_comment4)
    db.session.add(demo_comment5)
    db.session.add(demo_comment6)
    db.session.add(demo_comment7)
    db.session.add(demo_comment8)
    db.session.add(demo_comment9)
    db.session.add(demo_comment10)
    db.session.add(demo_comment11)
    db.session.add(demo_comment12)
    db.session.add(demo_comment13)
    db.session.add(demo_comment14)
    db.session.add(demo_comment15)
    db.session.add(demo_comment16)
    db.session.add(demo_comment17)
    db.session.add(demo_comment18)
    db.session.add(demo_comment19)
    db.session.add(demo_comment20)
    db.session.add(demo_comment21)
    db.session.add(demo_comment22)
    db.session.add(demo_comment23)
    db.session.add(demo_comment24)
    db.session.add(demo_comment25)
    db.session.add(demo_comment26)
    db.session.add(demo_comment27)
    db.session.add(demo_comment28)
    db.session.add(demo_comment29)
    db.session.add(demo_comment30)

    db.session.commit()

def undo_songs():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))
        
    db.session.commit()
