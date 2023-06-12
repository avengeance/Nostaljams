import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as SongActions from "../../store/songs";
import "./DeleteSong.css";

const DeleteModal = ({ songId, userId, closeModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modalRef = useRef(null);

    const songs = useSelector((state) => Object.values(state.songs.songs));

    const currentSong = songs.find((song) => {
        console.log('this is the obj', song)
    });


    function handleNoClick() {
        closeModal();
    }

    console.log('these are the songs', songs, songId)
    console.log('this is the curr song', currentSong)
    const deleteSong = async () => {
        await dispatch(SongActions.deleteSongThunk(songId));
        closeModal();
        history.push(`/users/${userId}/songs`);
    };

    function handleNoClick() {
        closeModal();
    }

    return (
        <div className="delete-modal">
            <h3>Are you sure you want to delete this song?</h3>
            <button onClick={deleteSong}>Yes</button>
            <button onClick={handleNoClick}>No</button>
        </div>
    );
}

export default DeleteModal
