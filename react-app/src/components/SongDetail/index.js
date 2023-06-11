import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";

import OpenModalButton from "./OpenModalButton";
import DeleteComment from "./DeleteComment";
import CreateComment from "./CreateComment";

import * as SongActions from "../../store/songs";
import * as CommentActions from "../../store/comments";
import * as PlaylistActions from "../../store/playlists";

import "./SongDetail.css";

const SongDetail = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setModalContent } = useModal();
    const modalRef = useRef(null);
    const { closeModal } = useModal();

    const currentSong = useSelector((state) => (state.songs.songs.Songs));
    const currentComments = useSelector((state) => (state.comments.comments.Comments));

    const { songId } = useParams();

    const [song, setSong] = useState(null);
    const [comments, setComments] = useState([]);
    const user = useSelector((state) => (state.session.user));

    useEffect(() => {
        dispatch(SongActions.getSongThunk(songId))
            .then(currentSong => setSong(currentSong))
        dispatch(CommentActions.getCommentsThunk(songId))
            .then(currentComments => setComments(currentComments))
    },[dispatch, songId])

    function handlePostComment(){
        const modalContent = <CreateComment onCommentSubmit={handlePostComment}/>;
        history.push(`/songs/${songId}/comments`);
        setModalContent(modalContent);
    }

    function handleDeleteComment(commentId){
        const modalContent = <DeleteComment onCommentDelete={handleDeleteComment} commentId={commentId}/>;
        history.push(`/songs/${songId}/comments`);
        setModalContent(modalContent);
    }

    useEffect(() => {
        if(!songId){
            console.error("No songId");
            return
        }
        dispatch(CommentActions.getCommentsThunk(songId))
            .then(comments => setComments(comments.Comments))
            .catch(err => console.error(err))
    },[dispatch, songId])

    return(
        <></>
    )
}
