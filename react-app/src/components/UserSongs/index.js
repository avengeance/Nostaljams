import React, {useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SongActions from '../../store/songs';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteSong';
import './UserSongs.css';

const UserSongs = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.session.user));
    const currentSong = useSelector((state) => (state.songs.songs.Songs));
    const [song, setSong] = useState([]);

    useEffect(() => {
        const getUserSongs = async () => {
            const response = await dispatch(SongActions.getSongsByUserThunk(user.id));
            setSong(response.Spots);
        }
        if(user){
            getUserSongs();
        }
    },[dispatch, user]);

    return (
        <></>
    )
}

export default UserSongs
