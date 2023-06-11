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
    const [songs, setSongs] = useState(null);
    console.log('user', user);
    useEffect(() => {
        const getUserSongs = async () => {
            const response = await dispatch(SongActions.getSongsByUserThunk(user.id));
            // this returns an arrow of our user songs obj
            console.log('this is res', response)
            setSongs(response);
        }
        if(user){
            getUserSongs();
        }
    },[dispatch, user]);

    console.log('these are the user songs', songs)

    return (
        <div className='user-page-container'>
            <div className='user-info-header'>

            </div>
        <div className='song-list'>
            {songs && songs.UserSongs.map((song, index) => (
            <div key={index}>
                <h3>{song.artists}</h3>
                <p>{song.audioUrl}</p>
                {/* Render other song properties as needed */}
            </div>
            ))}
        </div>
        </div>
    )
}

export default UserSongs
