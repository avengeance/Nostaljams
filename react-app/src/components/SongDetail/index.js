import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

// import OpenModalButton from ".OpenModalButton";
// import DeleteComment from "./DeleteComment";
// import CreateComment from "./CreateComment";

import * as SongActions from "../../store/songs";
import * as CommentActions from "../../store/comments";
import * as PlaylistActions from "../../store/playlists";

import "./SongDetail.css";

const SongDetail = () => {
    const { songId } = useParams();

    const { setModalContent } = useModal();
    // const modalRef = useRef(null);
    const { closeModal } = useModal();

    const allSongs = useSelector((state) => (state.songs.songs));
    // const currentSong = allSongs.filter(song => song.id === songId);
    const currentComments = useSelector((state) => (state.comments.comments));
    const user = useSelector((state) => (state.session.user));

    const [song, setSong] = useState(null);
    const [comments, setComments] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    console.log('this is our current song', allSongs)
    console.log('this is our current comments', currentComments)
    console.log('this is our user', user)
    useEffect(() => {
        if (!songId) {
            console.error("No songId");
            return;
        }

        dispatch(SongActions.getSongThunk(songId))
            .then(currentSong => setSong(currentSong))
        dispatch(CommentActions.getAllCommentsBySongThunk(songId))
            .then(currentComments => setComments(currentComments))
    },[dispatch, songId])


    // function handlePostComment(){
    //     const modalContent = <CreateComment onCommentSubmit={handlePostComment}/>;
    //     history.push(`/songs/${songId}/comments`);
    //     setModalContent(modalContent);
    // }

    // function handleDeleteComment(commentId){
    //     const modalContent = <DeleteComment onCommentDelete={handleDeleteComment} commentId={commentId}/>;
    //     history.push(`/songs/${songId}/comments`);
    //     setModalContent(modalContent);
    // }

    useEffect(() => {
        if(!songId){
            console.error("No songId");
            return
        }
        dispatch(CommentActions.getAllCommentsBySongThunk(songId))
            .then(comments => setComments(comments.Comments))
            .catch(err => console.error(err))
    },[dispatch, songId])

    return(
        // <div className="song-detail">
        // {currentSong && (
        //     <div className="song-info">
        //     <h2>{currentSong.title}</h2>
        //     <p>Artist: {currentSong.artist}</p>
        //     <p>Album: {currentSong.album}</p>
        // </div>
        // )}

        // <div className="comments-section">
        //     <h3>Comments</h3>
        //     {user && (
        //     <button onClick={handlePostComment}>Add Comment</button>
        //     )}
        //     {comments.map((comment) => (
        //         <div key={comment.id} className="comment">
        //         <p>{comment.content}</p>
        //         {user && user.id === comment.userId && (
        //             <button onClick={() => handleDeleteComment(comment.id)}>
        //             Delete
        //             </button>
        //         )}
        //         </div>
        //     ))}
        //     </div>
        // </div>
        <></>
    )
}

export default SongDetail
