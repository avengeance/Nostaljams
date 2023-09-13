import React from "react";
import { useModal } from "../../context/Modal";
import { usePlayer } from "../../context/playerContext";

import "./QueueModal.css";

function SetQueueModal({ playlist }) {
  const { closeModal } = useModal();
  // const { curSong, setCurSong, queue, setQueue } = usePlayer();

  console.log(playlist);

  const handleReplace = (playlist) => {};

  const handleAdd = (playlist) => {};

  const handleOk = () => {
    closeModal();
  };

  return (
    <div className="queue__modal">
      {playlist.songs.length ? (
        <div className="queue__modal__content">
          <h2>Playlist: {playlist.name}</h2>
          <p>Replace current queue?</p>
          <div className="queue__modal__buttons">
            <button onClick={() => handleReplace(playlist)}>
              Replace Queue
            </button>
            <button onClick={() => handleAdd(playlist)}>Add to Queue</button>
            <button onClick={() => handleOk()}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="queue__modal__content">
          <h2>Playlist: {playlist.name}</h2>
          <p>Playlist contains no songs</p>
          <button onClick={() => handleOk()}>Ok</button>
        </div>
      )}
    </div>
  );
}

export default SetQueueModal;
