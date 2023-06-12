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
    const userId = useSelector((state) => state.session.user?.id);
    const comment = useSelector((state) => state.comments.comments);

    const songLikesCount = currentSong?.SongLikesCnt;
    const userHasLiked = currentSong?.SongLikes?.some((like) => like.userId === userId);

    const [comments, setComments] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [liked, setLiked] = useState(false);

    const [song, setSong] = useState(null);
    // const [userHasLiked, setUserHasLiked] = useState(false);


    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (!songId) {
            console.error("No songId");
            return;
        }

        dispatch(SongActions.getSongThunk(songId))
        // .then((currentSong) => {
        //     setSong(currentSong)
        // }
        // );
    }, [dispatch, songId]);


    useEffect(() => {
        dispatch(CommentActions.getAllCommentsBySongThunk(songId))
            .then((comments) => setComments(comments));
    }, [dispatch, songId, refreshKey]);

    const handleLike = () => {
        // if (!liked) {
        dispatch(LikesActions.createSongLikeThunk(songId))
            .then(() => {
                setLiked(true);
                dispatch(SongActions.getSongThunk(songId));
                setRefreshKey(refreshKey + 1);
            });
        // }
    };

    function handlePostComment() {
        const modalContent = (
            <CreateCommentModal
                onCommentSubmit={handlePostComment}
            />)
        history.push(`/songs/${songId}`);
        setModalContent(modalContent);
    }

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
                        {!liked && (
                            <button onClick={handleLike}>
                                Like
                            </button>
                        )}
                        {/* <button onClick={handleUnlike}>
                            Unlike
                        </button> */}
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
                                    {userId === comment.userId && (
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
