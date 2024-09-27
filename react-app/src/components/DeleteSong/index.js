import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SongActions from "../../store/songs";
import './DeleteSong.css'

const DeleteModal = ({ songId, userId, closeModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const deleteSong = async () => {
    await dispatch(SongActions.deleteSongThunk(songId));
    closeModal();
    history.push(`/users/${userId}/songs`);
  };

  const handleNoClick = () => {
    closeModal();
  };

  return (
    <div className='delete-modal-overlay'>
      <div className="delete-modal">
        <div className='delete-modal-contents'>
          <h3>Are you sure you want to delete this song?</h3>
          <div className='delete-modal-buttons'>
            <button className='delete-button' onClick={deleteSong}>Yes</button>
            <button className='cancel-button' onClick={handleNoClick}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
