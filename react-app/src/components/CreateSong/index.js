import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./CreateSong.css";

function CreateSong() {
    const user = useSelector(state => state.session.user);
    
    const [song, setSong] = useState([])
    
    const [name, setName] = useState('');
    const [artists, setArtists] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [audio_url, setAudio_url] = useState('');
    
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
            audio_url
        }

        let newSong;

        try {
            const song = await dispatch(SongActions.createSong(payload));
            const newSongId = song.id;
            const url = `/songs/${newSongId}`;
            if (song){
                newSong = song
                setName('');
                setArtists('');
                setGenre('');
                setDescription('');
                setAudio_url('');
                setErrors([]);
                history.push(url);
            }
        } catch(res){
            const data = await res.json();
            setErrors(res.data.errors);
        }
    }
    return(
        <></>
    )
}

export default CreateSong
