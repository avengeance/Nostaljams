import React, { useState, useRef, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useModal } from "../../context/Modal";
import PropTypes from 'prop-types';
import * as CommentActions from "../../store/comments";
import "./CreateComment.css";

function CreateCommentModal({ songId, onCommentSubmit }) {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState("");
    const [refreshKey, setRefreshKey] = useState(0);
    const { closeModal } = useModal();
    const modalRef = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!comment.trim()) {
            setErrors("Please enter a comment.");
            return;
        }

        setErrors([]);
        const data = await dispatch(CommentActions.createCommentThunk(songId, comment))
        setComment("");

        if (data && !data.errors) {
            closeModal();
            onCommentSubmit();
            dispatch(CommentActions.getAllCommentsBySongThunk(songId));
            setRefreshKey(prevKey => prevKey + 1);
        } else if (data.errors) {
            setErrors(data.errors);
        }

    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            console.log("Global mouse down detected");
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeModal]);

    return (
        <div className='create-comment-modal' ref={modalRef}>
            <div className="create-comment-bg">
                <div className='create-comment-contents'>
                    <h1 id='login-text'>Comment</h1>
                    {errors && <p className="error-message">{errors}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="create-comment-form">
                            <label className='comment-label'>
                                <div className='comment-input'>
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        rows={3}
                                        cols={40}
                                        required
                                        placeholder="Type a comment..."
                                    ></textarea>
                                </div>
                                <button type='submit' className='submit-comment-button'>Submit</button>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

CreateCommentModal.propTypes = {
    songId: PropTypes.string.isRequired,
    onCommentSubmit: PropTypes.func.isRequired
}

export default CreateCommentModal
