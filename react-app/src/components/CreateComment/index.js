import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as CommentActions from "../../store/comments";
import "./CreateComment.css";

function CreateCommentModal(){
    const dispatch = useDispatch();
    const history = useHistory();
    const modalRef = useRef(null);

    const currentSong = useSelector((state) => (state.songs.songs.Songs));

    const [comment, setComment] = useState('');
    const [errors,setErrors] = useState([]);

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = currentSong.id

        setErrors([]);
        await dispatch(CommentActions.createCommentThunk({
            comment,
            url
        }))
    }

    function handleNoClick() {
        closeModal()
    }

    return(
        <> </>
    )
}

export default CreateCommentModal
