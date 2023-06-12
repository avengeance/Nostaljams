import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as PlaylistActions from "../../store/playlists";
import "./CreatePlaylist.css";

function CreatePlaylistModal({ userId, closeModal }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory();
    const params = useParams();
    const user = useSelector((state) => state.session.user); // Fetch the user object

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            description,
            userId,
        };

        try {
            const playlist = await dispatch(
                PlaylistActions.createPlaylistThunk(user.id, payload)
            );
            const newPlaylistId = playlist.id;
            const url = `/users/${user.id}/playlists/${newPlaylistId}`;
            if (playlist) {
                setName("");
                setDescription("");
                setErrors([]);
                closeModal();
                await dispatch(PlaylistActions.getUserPlaylistsThunk(user.id));
                history.push(url);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors(["An error occurred. Please try again."]);
            }
        }
    };


    return (
        <form className="create-playlist-form" onSubmit={handleSubmit}>
        <h2>Create Playlist</h2>
        {errors.length > 0 && (
            <ul className="errors">
            {errors.map((error, index) => (
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
            required
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
            <button type="submit">Create</button>
            <button type="button" onClick={closeModal}>
            Cancel
            </button>
        </div>
        </form>
    );
}

export default CreatePlaylistModal;
