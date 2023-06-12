import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as PlaylistActions from "../../store/playlists";
import "./EditPlaylist.css";

const EditPlaylist = () => {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const history = useHistory();

    const currentPlaylist = useSelector(
        (state) => state.playlists.playlists[playlistId]
    );
    const user = useSelector((state) => state.session.user);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (currentPlaylist) {
        setName(currentPlaylist.name);
        setDescription(currentPlaylist.description);
        }
    }, [currentPlaylist]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
        id: playlistId,
        name,
        description,
        };

        const data = await dispatch(
        PlaylistActions.updatePlaylistThunk(user.id, payload)
        );
        if (data) {
        history.push(`/users/${user.id}/playlists/${playlistId}`);
        }
    };

    return (
        <form className="edit-playlist-form" onSubmit={handleSubmit}>
        <h2>Edit Playlist</h2>
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
            <button type="submit">Update</button>
        </div>
        </form>
    );
};

export default EditPlaylist;
