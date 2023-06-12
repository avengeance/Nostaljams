import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import OpenModalButton from "../OpenModalButton";
import CreateCommentModal from "../CreateComment";
import DeleteComment from "../DeleteComment";

import * as SongActions from "../../store/songs";
import * as LikesActions from "../../store/likes";
import * as CommentActions from "../../store/comments";

// import "./SongDetail.css";

const SongDetail = () => {
    const { songId } = useParams();
    const { setModalContent } = useModal();
    const { closeModal } = useModal();

    const currentSong = useSelector((state) => state.songs.songs[songId]);
    const userId = useSelector((state) => state.session.user);

    const [song, setSong] = useState(null);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);


    const dispatch = useDispatch();
    const history = useHistory();


    useEffect(() => {
        if (!songId) {
            console.error("No songId");
            return;
        }

        dispatch(SongActions.getSongThunk(songId)).then((currentSong) => {
            setSong(currentSong)
            setLiked(currentSong?.likedbyCurrentuser || false)
        }
        );
    }, [dispatch, songId, currentSong?.likedbyCurrentuser]);

    useEffect(() => {
        setLiked(currentSong?.likedbyCurrentuser || false);
    }, [currentSong]);

    const handleLike = () => {
        if (!liked) {
            dispatch(LikesActions.createSongLikeThunk(songId))
                .then(() => setLiked(true))
            setSong((prevSong) => ({
                ...prevSong,
                SongLikesCnt: prevSong.SongLikesCnt + 1
            }))
        }
    }

    const handleUnlike = () => {
        if (liked) {
            const like = currentSong.SongLikes.find((like) => like.userId === userId)
            if (like) {
                const likeId = like.likeId
                dispatch(LikesActions.deleteLikeBySongThunk(songId, likeId))
                    .then(() => {
                        setLiked(false);
                        setSong((prevSong) => ({
                            ...prevSong,
                            SongLikesCnt: prevSong.SongLikesCnt - 1
                        }))
                    })
                history.push(`/songs/${songId}`);
            }
        }
    }

    useEffect(() => {
        dispatch(CommentActions.getAllCommentsBySongThunk(songId))
            .then(comments => setComments(comments))
    }, [dispatch, songId, refreshKey]);


    return (
        <div className="song-detail">
            {currentSong && (
                <div className="song-info">
                    <img
                        src={currentSong?.SongImage}
                        className="song-image"
                        alt={currentSong?.name || 'song-image'}
                    ></img>
                    <div className="song-actions">
                        <p>{currentSong.SongLikesCnt}</p>
                        <button onClick={handleLike}>
                            {/* {liked ? "Unlike" : "Like"} */}
                            Like
                        </button>
                        <button onClick={handleUnlike}>
                            {/* {liked ? "Like" : "Unlike"} */}
                            Unlike
                        </button>
                    </div>
                    <h2>{currentSong.name}</h2>
                    <p>Artist: {currentSong.artists}</p>
                    <p>Genre: {currentSong.genre}</p>
                    <p>Description: {currentSong.description}</p>
                    <div className='comment-button'>
                        {userId && (
                            <OpenModalButton
                                buttonText="Add Comment"
                                modalComponent={<CreateCommentModal
                                    songId={songId}
                                    onCommentSubmit={() => setRefreshKey(refreshKey + 1)}
                                    refreshKey={refreshKey}
                                    setRefreshKey={setRefreshKey}
                                />}
                            />
                        )}
                        <div className="song-comments">
                            {comments.map((comment, index) => (
                                <div key={index}>
                                    <p>{comment.comment}</p>
                                    {userId && userId.id === comment.userId && (
                                        <OpenModalButton
                                            buttonText="Delete Comment"
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
            )}
        </div>
    );
};

export default SongDetail;
