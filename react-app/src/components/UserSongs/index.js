import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as SongActions from '../../store/songs';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteSong';
import './UserSongs.css';
import { NavLink } from "react-router-dom";

// this component also needs:
    // a modal to delete a song
    // a link for updating a song

const UserSongs = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.session.user));
    const [songs, setSongs] = useState(null);
    const [deleteSongModal, setDeleteSongModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const getUserSongs = async () => {
            const response = await dispatch(SongActions.getSongsByUserThunk(user.id));
            setSongs(response);
        }
        if (user) {
            getUserSongs();
        }
    }, [dispatch, user]);

    const toggleDeleteModal = () => {
        setDeleteSongModal(!deleteSongModal);
    }
    const handleSongClick = (songId) => {
        history.push(`/songs/${songId}`)
    }

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
            const imgUrl = song.imgUrl && song.imgUrl.length > 0 ? song.imgUrl[0].imgUrl : null;
            const songId = song.id;
            return (
                <div
                    key={index}
                    className='song-item'
                >
                <div
                    className='song-info'
                    onClick={() => handleSongClick(song.id)}
                >
                <p>{song.name}</p>
                <img src={imgUrl} alt={song.name} className='song-image'/>
                <p>{song.artists}</p>
                <p>{song.genre}</p>
                <p>{song.SongLikesCnt}</p>
                </div>
                <button onClick={() => setDeleteSongModal(true)}>Delete</button>
                {deleteSongModal && (
                    <DeleteModal
                        songId={song?.id}
                        userId={user.id}
                        closeModal={() => setDeleteSongModal(false)} />
                )}
                </div>
            );
            })}
        </div>
        </div>
    )
}

export default UserSongs
