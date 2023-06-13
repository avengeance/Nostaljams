import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as PlaylistActions from "../../store/playlists";
import * as SongActions from "../../store/songs";
import "./CreatePlaylist.css";

function CreatePlaylistModal({ userId, closeModal }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedSong, setSelectedSong] = useState("");
    const [errors, setErrors] = useState({});

    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const songs = useSelector((state) => Object.values(state.songs.songs));

    useEffect(() => {
        dispatch(SongActions.getAllSongsThunk());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!name || name.trim() === "") {
            newErrors.name = "Name cannot be empty.";
        }
        if (!description || description.trim() === "") {
            newErrors.description = "Description cannot be empty.";
        }
        if (!selectedSong) {
            newErrors.song = "Please select a song for your playlist.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
          return; // Return early if there are errors
        }
        const playlistPayload = {
        name,
        description,
        userId,
        };

        try {
        const playlist = await dispatch(
            PlaylistActions.createPlaylistThunk(user.id, playlistPayload)
        );
        const playlistId = playlist.id;
        if (playlistId && selectedSong) {
            const songPayload = {
            songId: selectedSong,
            };
            await dispatch(
            PlaylistActions.addSongToPlaylistThunk(playlistId, songPayload)
            );
        }

        const url = `/users/${user.id}/playlists`;
        if (playlist) {
            setName("");
            setDescription("");
            setSelectedSong("");
            setErrors({});
            closeModal();
            await dispatch(PlaylistActions.getUserPlaylistsThunk(user.id));
            history.push(url);
        }
        } catch (res) {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
                } else {
                setErrors({ message: "An error occurred. Please try again." });
                }
            }
    };

    return (
        <form className="create-playlist-form" onSubmit={handleSubmit}>
        <h2>Create Playlist</h2>
        {Object.keys(errors).length > 0 && (
            <ul className="errors">
            {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
            ))}
            </ul>
        )}
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="song">Select Song</label>
            <select
            id="song"
            value={selectedSong}
            onChange={(e) => setSelectedSong(e.target.value)}
            >
            <option value="">-- Select a song --</option>
            {songs.map((song) => (
                <option key={song.id} value={song.id}>
                {song.name}
                </option>
            ))}
            </select>
        </div>
        <div className="form-group">
            <button type="submit">Create</button>
            <button type="button" onClick={closeModal}>
            Cancel
            </button>
        </div>
        </form>
    );
}

export default CreatePlaylistModal;
