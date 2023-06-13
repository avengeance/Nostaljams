import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./Song.css";
import { usePlayer } from "../../context/playerContext";

function Song() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => Object.values(state.songs.songs));
  const history = useHistory();
  const { curSong, setCurSong } = usePlayer();

  useEffect(() => {
    dispatch(SongActions.getAllSongsThunk());
  }, [dispatch]);

  const handleSongClick = (songId) => {
    history.push(`/songs/${songId}`);
  };

  const fetchImage = (url) =>
    fetch(`${url}`, {
      method: "GET",
      mode: "cors",
      cache: "no-store",
    })
      .then((response) => response.blob()) // convert to blob
      .then((blob) => {
        return URL.createObjectURL(blob);
      });

  return (
    <div className="song-container">

      {songs.map((song) => {
        if (!song.imgUrl) { return null }
        const imgUrl =
          song.imgUrl && song.imgUrl.length > 0 ? song.imgUrl[0].imgUrl : null;
        return (
          <>
            <div
              key={song.id}
              className="song-card"
              onClick={() => handleSongClick(song.id)}
            >
              <img src={imgUrl} alt={song.name} className="song-image" />
              <div className="song-details">
                <h3 className="song-name">{song.name}</h3>
                <p className="song-artists">{song.artists}</p>
              </div>
            </div>
            <button
              className="play__button"
              onClick={() => {
                setCurSong(song.audioUrl);
                console.log(song.audioUrl);
              }}
            ></button>
          </>
        );
      })}
    </div>
  );
}

export default Song;
