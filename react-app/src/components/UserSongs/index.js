import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as SongActions from '../../store/songs';
import OpenModalButton from '../OpenModalButton';
import DeleteModal from '../DeleteSong';
import './UserSongs.css';
import { NavLink } from "react-router-dom";

const UserSongs = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [songs, setSongs] = useState(null);
    const [deleteSongModals, setDeleteSongModals] = useState({});
    const [refresh, setRefresh] = useState(false)
    const history = useHistory();
    console.log('this is songs', songs)
    useEffect(() => {
        const getUserSongs = async () => {
        const response = await dispatch(SongActions.getSongsByUserThunk(user.id));
            setSongs(response);
        };

        if (user ) {
            getUserSongs();
        }
    }, [dispatch, user, refresh]);

    const toggleDeleteModal = (songId) => {
        setDeleteSongModals((prevState) => ({
        ...prevState,
        [songId]: !prevState[songId]
        }));
        setRefresh(refresh ? false : true)
    };

    const handleSongClick = (songId) => {
        history.push(`/songs/${songId}`);
    };

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
                const deleteModalOpen = deleteSongModals[songId] || false;
                return (
                <div key={index} className='song-item'>
                    <div
                    className='song-info'
                    onClick={() => handleSongClick(songId)}
                    >
                    <p>{song.name}</p>
                    <img src={imgUrl} alt={song.name} className='song-image' />
                    <p>{song.artists}</p>
                    <p>{song.genre}</p>
                    <p>{song.SongLikesCnt}</p>
                    </div>
                    <button>Update Song</button>
                    <button onClick={() => toggleDeleteModal(songId)}>Delete</button>
                    {deleteModalOpen && (
                        <DeleteModal
                            songId={songId}
                            userId={user.id}
                            closeModal={() => toggleDeleteModal(songId)}
                        />
                    )}
                </div>
                );
            })}
        </div>
        </div>
    );
};

export default UserSongs;
