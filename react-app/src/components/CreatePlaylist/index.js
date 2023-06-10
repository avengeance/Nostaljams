import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as PlaylistActions from "../../store/playlists";
import "./CreatePlaylist.css";

function CreatePlaylistModal(){
    const dispatch = useDispatch();
    const currentSong = useSelector((state) => (state.songs.songs.Songs));
    const { closeModal } = useModal();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors,setErrors] = useState([]);

    const history = useHistory();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            description
        }

        let newPlaylist;

        try{
            const playlist = await dispatch(PlaylistActions.createPlaylistThunk(payload));
            const newPlaylistId = playlist.id;
            const url = `/playlists/${newPlaylistId}`;
            if (playlist){
                newPlaylist = playlist;
                setName('');
                setDescription('');
                setErrors([]);
                history.push(url);
            }
        } catch(err){
            setErrors(err.response.data.errors);
        }

    }

    return (
        <></>
    )
}
