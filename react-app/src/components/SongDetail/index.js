import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import OpenModalButton from "../OpenModalButton";
import CreateCommentModal from "../CreateComment";
import DeleteComment from "../DeleteComment";

import { usePlayer } from "../../context/playerContext";

import * as SongActions from "../../store/songs";
import * as LikesActions from "../../store/likes";
import * as CommentActions from "../../store/comments";

import "./SongDetail.css";

const SongDetail = () => {
  const { songId } = useParams();
  const { closeModal } = useModal();

    const { curSong, setCurSong } = usePlayer();

    const currentSong = useSelector((state) => state.songs.songs[songId]);
    const userId = useSelector((state) => state.session.user?.id);
    const likesBySong = useSelector((state) => state.likes.likesBySong);


  const [comments, setComments] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [liked, setLiked] = useState(false);


        const dispatch = useDispatch();

    useEffect(() => {
        if (!songId) {
        console.error("No songId");
        return;

    }

    dispatch(SongActions.getSongThunk(songId));

    dispatch(LikesActions.getLikesBySongThunk(songId))
      .then(likes => {
        const userLike = likes.find(
          like => like.userId === userId
        );

        setLiked(!!userLike);
      });

  }, [dispatch, songId, userId]);


  useEffect(() => {
    dispatch(CommentActions.getAllCommentsBySongThunk(songId))
      .then((comments) => setComments(comments));
  }, [dispatch, songId, refreshKey]);

  const handleLike = () => {
    dispatch(LikesActions.createSongLikeThunk(songId))
      .then(() => {
        setLiked(true);
        dispatch(SongActions.getSongThunk(songId));
        setRefreshKey(refreshKey + 1);
      });
  };

  const handleUnlike = () => {
    const likesObj = Object.values(likesBySong).find(
      like => like.userId === userId && like.songId === parseInt(songId));
    if (!likesObj) {
      console.error('No like found for the current user and song')
      return
    }
    const likeId = likesObj.id
    dispatch(LikesActions.deleteLikeBySongThunk(songId, likeId))
      .then(() => {
        setLiked(false);
        dispatch(SongActions.getSongThunk(songId));
        setRefreshKey(refreshKey + 1);
      })

    //   const { songId } = useParams();
    //   const { closeModal } = useModal();

    //   const { curSong, setCurSong } = usePlayer();


    useEffect(() => {
        dispatch(CommentActions.getAllCommentsBySongThunk(songId)).then(
        (comments) => setComments(comments)
        );
    }, [dispatch, songId, refreshKey]);

    const handleLike = () => {
        dispatch(LikesActions.createSongLikeThunk(songId)).then(() => {
        setLiked(true);
        dispatch(SongActions.getSongThunk(songId));
        setRefreshKey(refreshKey + 1);
        });
    };

    const handleUnlike = () => {
        const likesObj = Object.values(likesBySong).find(
        (like) => like.userId === userId && like.songId === parseInt(songId)
        );
        if (!likesObj) {
        console.error("No like found for the current user and song");
        return;
        }
        const likeId = likesObj.id;
        dispatch(LikesActions.deleteLikeBySongThunk(songId, likeId)).then(() => {
        setLiked(false);
        dispatch(SongActions.getSongThunk(songId));
        setRefreshKey(refreshKey + 1);
        });
    };

    return (
        <div className="song-detail">
        {currentSong && (
            <div>
            <div className="song-detail-container">
                <div className="song-info">
                <button
                    className="audioPlayer__button_album_art"
                    onClick={() => {
                    setCurSong(currentSong.audio_url);
                    }}
                >
                    <img
                    src={currentSong?.SongImage}
                    className="song-image"
                    alt={currentSong?.name || "song-image"}
                    ></img>
                </button>
                <div className="song-actions">
                    <p id="song-likes">{currentSong.SongLikesCnt}</p>
                    {!liked && (
                    <button onClick={handleLike}>
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    )}
                    {liked && (
                    <button onClick={handleUnlike}>
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                    )}
                </div>
                <div className="song-info-details">
                    <h2>{currentSong.name}</h2>
                    <span>Artist: </span>
                    <p className="song-description">{currentSong.artists}</p>
                    <span>Genre: </span>
                    <p className="song-description">{currentSong.genre}</p>
                    <span>Description: </span>
                    <p className="song-description">{currentSong.description}</p>
                </div>
                </div>
            </div>
            <div className="comment-section">
                <h2>Comments</h2>
                <div className="comment-button">
                {userId && (
                    <OpenModalButton
                    buttonText={<i class="fas fa-comment">Add comment</i>}
                    modalComponent={
                        <CreateCommentModal
                        />
                    }
                    />
                )}
                <div className="song-comments">
                    {comments.map((comment, index) => (
                    <div key={index}>
                        <p>{comment.comment}</p>
                        {userId === comment.userId && (
                        <OpenModalButton
                            buttonText={<i class="fas fa-trash">Delete Comment</i>}
                            modalComponent={
                            <DeleteComment
                                songId={songId}
                                commentId={comment.id}
                                closeModal={closeModal}
                                refreshKey={refreshKey}
                                setRefreshKey={setRefreshKey}
                            />
                            }
                        />
                        )}
                    </div>
                    ))}
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
};
}


export default SongDetail;
