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
            <div className='delete-modal-contents'>
                <h3 className='delete-modal-h3'>Are you sure you want to delete this comment?</h3>
                <div className='delete-modal-buttons'>
                    <button className='delete-button' onClick={deleteComment}>Yes</button>
                    <button className='cancel-button' onClick={handleNoClick}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteComment
