import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as PlaylistActions from "../../store/playlists";
import "./DeletePlaylist.css";

const DeleteModal = ({ playlistId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modalRef = useRef(null);

    const playlists = useSelector((state) => (state.playlists.playlists.Playlists));

    const { closeModal } = useModal();

    const deletePlaylist = async () => {
        if (playlists.length > 0) {
            const currentPlaylist = playlists.find((playlist) => playlist.id === playlistId)
            await dispatch(PlaylistActions.deletePlaylistThunk(playlistId));
            history.push('/playlists/current');
        }
    }

    function handleNoClick() {
        closeModal()
    }
    return (
        <></>
    )
}

export default DeleteModal
