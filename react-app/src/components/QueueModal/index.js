import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as PlayerActions from "../../store/player";


import "./QueueModal.css";

function SetQueueModal({ playlist }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleReplace = (playlist) => {
    dispatch(PlayerActions.setQueueThunk(playlist.songs))
  };

  const handleAdd = (playlist) => {
    dispatch(PlayerActions.addQueueThunk(playlist.songs))
    closeModal();
  };

  const handleOk = () => {
    closeModal();
  };

  return (
    <div className="queue__modal">
      {playlist.songs.length ? (
        <div className="queue-modal-contents">
          <h2>{playlist.name}</h2>
          <p>Replace current queue?</p>
          <div className="queue-modal-buttons">
            <button onClick={() => handleReplace(playlist)}>
              Replace Queue
            </button>
            <button onClick={() => handleAdd(playlist)}>Add to Queue</button>
            <button onClick={() => handleOk()}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="queue-modal-contents">
          <h2>{playlist.name}</h2>
          <p>Playlist contains no songs</p>
          <div className="queue-modal-buttons">
            <button onClick={() => handleOk()}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SetQueueModal;
