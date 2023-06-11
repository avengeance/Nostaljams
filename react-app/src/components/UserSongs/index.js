import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as SongActions from '../../store/songs';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteSong';
import './UserSongs.css';
import { NavLink, useHistory } from "react-router-dom";

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
        {user && (
            <div className='user-info-header'>
                <div>
                    <img
                        src={user?.userImg[0]?.imgUrl}
                        alt={user?.firstName}
                        className="user-img"
                        />
                    <h2 className='user-firstname'>{user?.firstName}</h2>
                    <p className='user-username'>{user?.username}</p>
                </div>

            </div>
        )}
        <div className='user-playlist'>
            <NavLink to={`/users/${user?.id}/playlists`}>Playlists</NavLink>
        </div>
        <div className='song-list'>
        {songs &&
        songs?.UserSongs.map((song, index) => {
            console.log("song", song);
            const imgUrl = song.imgUrl && song.imgUrl.length > 0 ? song.imgUrl[0].imgUrl : null;
            return (
                <div key={index}>
                <p>{song.name}</p>
                <img src={imgUrl} alt={song.name} className='song-image'/>
                <p>{song.artists}</p>
                <p>{song.genre}</p>
                <p>{song.SongLikesCnt}</p>
                </div>
            );
            })}
        </div>
        </div>
    )
}

export default UserSongs
