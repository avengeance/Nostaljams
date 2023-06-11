import React, { useEffect, useState } from 'react';
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
        if (user) {
            getUserSongs();
        }
    }, [dispatch, user]);

    console.log('this is user', user)
    console.log('these are the user songs', songs)

    return (
        <div className='user-page-container'>
            {/* stuff we need to add:
             *if profile picture is not available, have a placeholder img with a upload image button
             */}
        {user && (
            <div className='user-info-header'>
                <div>
                    <img src={user?.userImg} alt={user?.firstName} className="user-img"/>
                    <h2 className='user-firstname'>{user?.firstName}</h2>
                    <p className='user-username'>{user?.username}</p>
                </div>
            </div>
        )}

        <div className='song-list'>
            {songs && songs?.UserSongs.map((song, index) => (
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
