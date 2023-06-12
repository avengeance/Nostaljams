import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as CommentActions from "../../store/comments";
import "./CreateComment.css";

function CreateCommentModal() {
    const dispatch = useDispatch();

    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState("");
    const { closeModal } = useModal();

    const { songId } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const data = await dispatch(CommentActions.createCommentThunk(songId, comment))
        setComment("");
        if (data && data.errors) {
            setErrors(data.errors);
        } else {
            setErrors(["The provided credentials are invalid"]);
        }
        if (data.ok) {
            closeModal()
        }
    }

    return (
        <>
            <div className="create-comment-modal">
                <h1 id='login-text'>Comment</h1>
                <form onSubmit={handleSubmit}>
                    <div className="create-comment-form">
                        <label id='username-email'>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                required
                                placeholder="Comment"
                            ></textarea>
                            <button type='submit'>Submit</button>
                        </label>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateCommentModal
