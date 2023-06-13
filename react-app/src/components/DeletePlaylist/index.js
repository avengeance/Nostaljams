import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as PlaylistActions from "../../store/playlists";
import "./DeletePlaylist.css";

const DeleteModal = ({ playlistId, userId, closeModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    console.log('this is playlsitId', playlistId)
    const deletePlaylist = async () => {
            await dispatch(PlaylistActions.deletePlaylistThunk(playlistId));
            closeModal();
            history.push(`/users/${userId}/playlists`);
    }

    function handleNoClick() {
        closeModal()
    }

    return (
        <div className="delete-modal">
        <h3>Are you sure you want to delete this playlist?</h3>
        <button onClick={deletePlaylist}>Yes</button>
        <button onClick={handleNoClick}>No</button>
        </div>
    )
}

export default DeleteModal
