"""Adding Likes Tables

Revision ID: f4bf17de49cc
Revises: 7a06e0d696ab
Create Date: 2023-06-01 21:26:41.993917

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'f4bf17de49cc'
down_revision = '7a06e0d696ab'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('song_likes',
    sa.Column('id', sa.Integer()),
    sa.Column('user_id', sa.Integer()),
    sa.Column('song_id', sa.Integer()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id']),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_likes',
    sa.Column('id', sa.Integer()),
    sa.Column('user_id', sa.Integer()),
    sa.Column('playlist_id', sa.Integer()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id']),
    sa.PrimaryKeyConstraint('id')
    )

def downgrade():
    op.drop_table('song_likes')
    op.drop_table('playlist_likes')
