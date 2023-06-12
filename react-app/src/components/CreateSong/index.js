import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./CreateSong.css";

//need to add a way to also include a song image; if not, use a default image

function CreateSong() {
    const user = useSelector(state => state.session.user);

    const [song, setSong] = useState([])

    const [name, setName] = useState('');
    const [artists, setArtists] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [audio_url, setAudio_Url] = useState('');
    const [image_url, setImage_Url] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name,
            artists,
            genre,
            description,
            audio_url,
            image_url
        }

        let newSong;

        try {
            const song = await dispatch(SongActions.createSongThunk(payload));
            const newSongId = song.id;
            const url = `/songs/${newSongId}`;
            if (song){
                newSong = song
                setName('');
                setArtists('');
                setGenre('');
                setDescription('');
                setAudio_Url('');
                setImage_Url('');
                setErrors([]);
                history.push(url);
            }
        } catch(res){
            const data = await res.json();
            setErrors(data.errors);
        }
    }
    return (
        <div className="create-song-form-container">
            <form className="create-song-form" onSubmit={handleSubmit}>
                <h2>Create a Song</h2>
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
                <button type="submit">Create</button>
            </form>
            </div>
        );
}

export default CreateSong
