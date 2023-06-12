import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as CommentActions from "../../store/comments";
import './DeleteComment.css';

const DeleteComment = ({ songId, commentId, refreshKey, setRefreshKey }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteComment = async () => {
        await dispatch(CommentActions.deleteCommentThunk(commentId))
        setRefreshKey(refreshKey + 1);
        closeModal();
        history.push(`/songs/${songId}`);
    }
    const handleNoClick = () => {
        closeModal()
    }
    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this comment?</h3>
            <button onClick={deleteComment}>Yes</button>
            <button onClick={handleNoClick}>No</button>
        </div>
    )
}

export default DeleteComment
