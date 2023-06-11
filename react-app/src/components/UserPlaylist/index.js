import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as PlaylistActions from '../../store/playlists';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeletePlaylist';
import './UserPlaylist.css';

const UserPlaylist = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.session.user));
    // const currentPlaylist = useSelector((state) => (state.playlists.playlists.Playlists));
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        const getUserPlaylists = async () => {
            const response = await dispatch(PlaylistActions.getUserPlaylistsThunk(user.id));
            setPlaylist(response);
        }
        if(user){
            getUserPlaylists();
        }
    },[dispatch, user]);

    return (
        <div></div>
    )
}

export default UserPlaylist
