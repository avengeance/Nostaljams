import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./EditSong.css";

function EditSong() {
    const { id } = useParams();
    const user = useSelector((state) => state.session.user);

    const [name, setName] = useState("");
    const [artists, setArtists] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [audio_url, setAudio_Url] = useState("");
    const [image_url, setImage_Url] = useState("");
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const fetchSong = async () => {
        const response = await dispatch(SongActions.getSongThunk(id));
        if (response) {
            const { name, artists, genre, description, audio_url, image_url } =
            response;
            setName(name);
            setArtists(artists);
            setGenre(genre);
            setDescription(description);
            setAudio_Url(audio_url);
            setImage_Url(image_url);
        }
        };

        fetchSong();
    }, [dispatch, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
        name,
        artists,
        genre,
        description,
        audio_url,
        image_url,
        };

        try {
        await dispatch(SongActions.updateSongThunk(id, payload));
        history.push(`/songs/${id}`);
        } catch (res) {
        const data = await res.json();
        setErrors(data.errors);
        }
    };

    return (
        <div className="edit-song-form-container">
        <form className="edit-song-form" onSubmit={handleSubmit}>
            <h2>Edit Song</h2>
            {errors.length > 0 && (
            <ul>
                {errors.map((error, index) => (
                <li key={index}>{error}</li>
                ))}
            </ul>
            )}
            <div className="form-field">
            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="form-field">
            <label>Artists</label>
            <input
                type="text"
                value={artists}
                onChange={(e) => setArtists(e.target.value)}
            />
            </div>
            <div className="form-field">
            <label>Genre</label>
            <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            />
            </div>
            <div className="form-field">
            <label>Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            </div>
            <div className="form-field">
            <label>Audio URL</label>
            <input
                type="text"
                value={audio_url}
                onChange={(e) => setAudio_Url(e.target.value)}
            />
            </div>
            <div className="form-field">
            <label>Image URL</label>
            <input
                type="text"
                value={image_url}
                onChange={(e) => setImage_Url(e.target.value)}
            />
            </div>
            <button type="submit">Update</button>
        </form>
        </div>
    );
}

export default EditSong;
