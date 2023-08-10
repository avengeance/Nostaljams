import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as PlaylistActions from "../../store/playlists";
import "./DeletePlaylist.css";

const DeleteModal = ({ playlistId, userId, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const deletePlaylist = async () => {
    await dispatch(PlaylistActions.deletePlaylistThunk(playlistId));
    closeModal();
    history.push(`/users/${userId}/playlists`);
  };

  function handleNoClick() {
    closeModal();
  }

  return (
    <div className="delete-modal">
      <div className="delete-modal-contents">
        <h3>Are you sure you want to delete this playlist?</h3>
        <div className="delete-modal-buttons">
          <button onClick={deletePlaylist}>Yes</button>
          <button onClick={handleNoClick}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
