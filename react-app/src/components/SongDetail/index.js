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
import * as SessionActions from "../../store/session";
import "./SongDetail.css";

const SongDetail = () => {
    const { songId } = useParams();
    const { closeModal } = useModal();

    const { curSong, setCurSong } = usePlayer();

    const currentSong = useSelector((state) => state.songs.songs[songId]);
    const userId = useSelector((state) => state.session.user?.id);
    const likesBySong = useSelector((state) => state.likes.likesBySong);
    const allUsers = useSelector((state) => state.session.allUsers);
    console.log('allUsers', allUsers);

    const [users, setUsers] = useState({});
    const [comments, setComments] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [liked, setLiked] = useState(false);

        const dispatch = useDispatch();

    useEffect(() => {
        if (!songId) {
        console.error("No songId");
        return;
        }
        dispatch(SessionActions.fetchAllUsers());
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
                <div className="song-info-box">
                    <div className='song-pic-box'>
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
                </div>
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
                        songId={songId}
                        onCommentSubmit={() => setRefreshKey(refreshKey + 1)}
                        refreshKey={refreshKey}
                        setRefreshKey={setRefreshKey}
                        />
                    }
                    />
                )}
                </div>
                <div className="song-comments">
                    {comments.map((comment, index) => (
                    <div key={index} className="song-comments-contents">

                            <div className='comment-user-img'>
                                <img src={allUsers?.[comment.userId]?.userImg?.[0]?.imgUrl} alt={allUsers?.[comment.userId]?.username || 'Anonymous'} />
                            </div>
                            <div className='comments-user-box'>
                                <p className='user-comment-name'>
                                    <strong>{allUsers?.[comment.userId]?.username || "Anonymous"}</strong>
                                </p>
                                <p className='user-comment-p'>
                                {comment.comment}
                                </p>
                            </div>
                        {userId === comment.userId && (
                        <div className='delete-comment'>
                            <OpenModalButton
                                className='delete-comment-button'
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
                        </div>
                        )}
                    </div>
                    ))}
                </div>

            </div>
            </div>
        )}
        </div>
    );
};

export default SongDetail;
