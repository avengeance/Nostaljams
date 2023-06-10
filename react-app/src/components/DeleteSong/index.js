import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as SongActions from "../../store/songs";
import "./DeleteSong.css";

const DeleteModal = ({ songId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const modalRef = useRef(null);

    const songs = useSelector((state) => (state.songs.songs.Songs));

    const { closeModal } = useModal();

    const deleteSong = async () => {
        if (songs.length > 0) {
            const currentSong = songs.find((song) => song.id === songId)
            await dispatch(SongActions.deleteSongThunk(songId));
            history.push('/songs/current');
        }
    }

    function handleNoClick() {
        closeModal()
    }

    return (
        <></>
    )
}
