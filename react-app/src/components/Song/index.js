import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./Song.css";

function Song() {
    const dispatch = useDispatch();
    const songs = useSelector((state) => Object.values(state.songs.songs))
    const history = useHistory()
    console.log('songs', songs)
    console.log(songs.imgUrl)
    useEffect(() => {
        dispatch(SongActions.getAllSongsThunk())
    }, [dispatch])

    const handleSongClick = (songId) => {
        history.push(`/songs/${songId}`)
    }

    return (
        <div className="song-container">
        {songs.map((song) => {
        const imgUrl = song.imgUrl && song.imgUrl.length > 0 ? song.imgUrl[0].imgUrl : null;
        return (
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
        );
    })}
    </div>
    )
}

export default Song
