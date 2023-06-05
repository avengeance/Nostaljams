"""Create_geryko_tables

Revision ID: 7a06e0d696ab
Revises: 4d45472b3cd9
Create Date: 2023-06-01 10:56:49.397363

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '7a06e0d696ab'
down_revision = '4d45472b3cd9'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_songs',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id']),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id']),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=True),
    sa.Column('is_Banner', sa.Boolean(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('song_images',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.Column('img_url', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id']),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id']),
    sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE playlists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE playlist_songs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE user_images SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE song_images SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('playlists')
    op.drop_table('playlist_songs')
    op.drop_table('user_images')
    op.drop_table('song_images')
    op.drop_table('comments')