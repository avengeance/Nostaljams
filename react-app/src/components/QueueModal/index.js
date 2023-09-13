import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as audioPlayerActions from "../../store/player";
import { useModal } from "../../context/Modal";
import { usePlayer } from "../../context/playerContext";

import "./QueueModal.css";

function SetQueueModal({ playlist }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const { curSong, setCurSong, setQueue } = usePlayer();
  console.log(playlist);

  const handleReplace = (playlist) => {
    dispatch(audioPlayerActions.setQueueThunk(playlist.songs));
  };

  const handleAdd = (playlist) => {
    dispatch(audioPlayerActions.addQueueThunk(playlist.songs));
  };

  const handleOk = () => {
    closeModal();
  };

  return (
    <div className="queue__modal">
      {playlist.songs.length ? (
        <>
          <h2>Replace current queue?</h2>
          <h3>{playlist.name}</h3>
          <button onClick={() => handleReplace(playlist)}>Replace Queue</button>
          <button onClick={() => handleAdd(playlist)}>Add to Queue</button>
          <button onClick={() => handleOk()}>Cancel</button>
        </>
      ) : (
        <>
          <h2>Playlist contains no songs</h2>
          <h3>{playlist.name}</h3>
          <button onClick={() => handleOk()}>Ok</button>
        </>
      )}
    </div>
  );
}

export default SetQueueModal;
