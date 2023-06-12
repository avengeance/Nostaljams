import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as PlaylistActions from '../../store/playlists';
import DeleteModal from '../DeletePlaylist';
import EditPlaylist from '../EditPlaylist';
import CreatePlaylistModal from '../CreatePlaylist';
import './UserPlaylist.css';

// this app also needs:
    // a modal to delete a playlist = done
    // a link for updating a playlist = wip
    // a modal to create a playlist = wip
const UserPlaylist = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => (state.session.user));
    const [playlists, setPlaylists] = useState([]);
    const [deletePlaylistModals, setDeletePlaylistModals] = useState({});
    const [refresh, setRefresh] = useState(false)
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        const getUserPlaylists = async () => {
            const response = await dispatch(PlaylistActions.getUserPlaylistsThunk(user.id));
            setPlaylists(response);
        }

        if(user){
            getUserPlaylists();
        }
    },[dispatch, user, refresh]);

    const toggleDeleteModal = (playlistId) => {
        console.log('playlistId from toggleDeleteModal',playlistId)
        setDeletePlaylistModals((prevState) => ({
        ...prevState,
        [playlistId]: !prevState[playlistId]
        }));
        setRefresh(refresh ? false : true)
    };

    const toggleCreateModal = () => {
        setShowCreateModal((prev) => !prev);
        dispatch(PlaylistActions.getUserPlaylistsThunk(user.id));
    };

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
                    <button className="create-playlist-button" onClick={toggleCreateModal}>
                    Make a Playlist
                    </button>
                </div>
                ) : (
                <div className='playlist-list'>
                    <div className='create-playlist'>
                    <button className="create-playlist-button" onClick={toggleCreateModal}>
                    Make a Playlist
                    </button>
                    </div>
                {Object.values(playlists).map((playlist) => (
                <div key={playlist.id} className='playlist-item'>
                    <h3>{playlist.name}</h3>
                    {/* Render the songs within the playlist */}
                    <div className="playlist-container">
                    <div className="featured-song">
                        {/* Display the image of the first song */}
                        <img src={playlist.songs[0]?.imgUrl[0]?.imgUrl} alt="Song Cover" className='playlist-img' />
                        <div>
                        <h4>{playlist.songs[0]?.name}</h4>
                        <p>{playlist.songs[0]?.artists}</p>
                        </div>
                    </div>
                    <ul className="song-list">
                        {/* Render the remaining songs */}
                        {playlist.songs.slice(1).map((song) => (
                        <li key={song.id}>
                            <img src={song.imgUrl[0]?.imgUrl} alt="Song Cover" />
                            <div>
                            <h4>{song.name}</h4>
                            <p>{song.artists}</p>
                            </div>
                        </li>
                        ))}
                        <div className='update-playlist'>
                            <Link to={`/users/${user.id}/playlists/${playlist.id}/edit`}>Update Playlist</Link>
                        </div>
                        <button onClick={() => toggleDeleteModal(playlist.id)}>Delete</button>
                        {deletePlaylistModals[playlist.id] && (
                        <DeleteModal
                            playlistId={playlist.id}
                            userId={user.id}
                            closeModal={() => toggleDeleteModal(playlist.id)}
                        />
                        )}
                    </ul>
                    </div>
                </div>
                ))}
                </div>
                )}
            </div>

      {/* Render the CreatePlaylistModal */}
        {showCreateModal && (
            <CreatePlaylistModal
                userId={user.id}
                closeModal={toggleCreateModal}
                refreshPlaylists={() => setRefresh((prev) => !prev)}
                />
        )}
            </div>
        );
}

export default UserPlaylist
