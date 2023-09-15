import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SongActions from "../../store/songs";
import * as PlayerActions from "../../store/player";
import "./Song.css";

function Song() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => Object.values(state.songs.songs));
  const history = useHistory();

  useEffect(() => {
    dispatch(SongActions.getAllSongsThunk());
  }, [dispatch]);

  const handleSongClick = (songId) => {
    history.push(`/songs/${songId}`);
  };

  const playCurrSong = (song) => {
    dispatch(PlayerActions.setQueueThunk(song));
  };

  const addSongToQueue = (song) => {
    dispatch(PlayerActions.addQueueThunk(song));
  };

  return (
    <div className="song-container">
      {songs.map((song) => {
        if (!song.imgUrl) {
          return null;
        }
        const imgUrl =
          song.imgUrl && song.imgUrl.length > 0 ? song.imgUrl[0].imgUrl : null;
        return (
          <div key={song.id}>
            <div className="song-card">
              <img
                src={imgUrl}
                alt={song.name}
                className="song-image"
                onClick={() => handleSongClick(song.id)}
              />
              <div className="song-details">
                <div
                  className="song__details__button"
                  onClick={() => handleSongClick(song.id)}
                >
                  <h3 className="song-name">{song.name}</h3>
                  <p className="song-artists">{song.artists}</p>
                </div>
                <div>
                  <button
                    className="play__button"
                    onClick={() => {
                      playCurrSong(song);
                    }}
                  >
                    <i className="fas fa-play"></i>
                  </button>
                  <button
                    className="queue__button"
                    onClick={() => {
                      addSongToQueue(song);
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Song;
