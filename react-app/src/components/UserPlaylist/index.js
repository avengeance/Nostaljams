import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as PlaylistActions from '../../store/playlists';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeletePlaylist';
import './UserPlaylist.css';

// this app also needs:
    // a modal to delete a playlist
    // a link for updating a playlist

const UserPlaylist = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.session.user));
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        const getUserPlaylists = async () => {
            const response = await dispatch(PlaylistActions.getUserPlaylistsThunk(user.id));
            setPlaylists(response);
        }

        if(user){
            getUserPlaylists();
        }
    },[dispatch, user]);

    console.log('this is user', user)
    console.log('these are the user playlists', playlists)

    return (
            <div className='user-playlists-container'>
            {user && (
                <div className='user-info-header'>
                <div>
                    <img
                    src={user?.userImg[0]?.imgUrl}
                    alt={user?.firstName}
                    className='user-img'
                    />
                    <h2 className='user-firstname'>{user?.firstName}</h2>
                    <p className='user-username'>{user?.username}</p>
                </div>
                </div>
            )}
            <div className='playlist-section'>
                {Object.keys(playlists).length === 0 ? (
                <div className='no-playlist-message'>
                    <p>You haven't created any playlists yet!</p>
                    {/* <Link to='/create-playlist' className='create-playlist-button'>
                    Make a Playlist
                    </Link> */}
                </div>
                ) : (
                <div className='playlist-list'>
                    {Object.values(playlists).map((playlist) => (
                    <div key={playlist.id} className='playlist-item'>
                        <h3>{playlist.name}</h3>
                        {/* playlist.songs is an array, we should be able
                         to display the songs in the playlist */}
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        );
}

export default UserPlaylist
