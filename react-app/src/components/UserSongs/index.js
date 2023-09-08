import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as SongActions from "../../store/songs";
import OpenModalLink from "../OpenModalLink";
import EditSongModal from "../EditSongModal";
import DeleteModal from "../DeleteSong";
import "./UserSongs.css";
import { NavLink } from "react-router-dom";

const UserSongs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [songs, setSongs] = useState(null);
  const [deleteSongModals, setDeleteSongModals] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      dispatch(SongActions.getSongsByUserThunk(user.id)).then((res) =>
        setSongs(res)
      );
    }
  }, [dispatch, user, refresh]);

  const toggleDeleteModal = (songId) => {
    setDeleteSongModals((prevState) => ({
      ...prevState,
      [songId]: !prevState[songId],
    }));
    setRefresh(refresh ? false : true);
  };

  const handleSongClick = (songId) => {
    history.push(`/songs/${songId}`);
  };

  return (
    <div className="user-page-container">
      {user && (
        <div className="user-info-header">
          <div>
            <img
              src={user?.userImg[0]?.imgUrl}
              alt={user?.firstName}
              className="user-img"
            />
            <h2 className="user-firstname">{user?.firstName}</h2>
            <p className="user-username">{user?.username}</p>
          </div>
        </div>
      )}
      <button className="user-playlist">
        <NavLink to={`/users/${user?.id}/playlists`}>Playlists</NavLink>
      </button>

      <div className="song-list">
        {songs &&
          songs?.UserSongs.map((song, index) => {
            const imgUrl =
              song.imgUrl && song.imgUrl.length > 0
                ? song.imgUrl[0].imgUrl
                : null;
            const songId = song.id;
            const deleteModalOpen = deleteSongModals[songId] || false;
            return (
              <div key={index} className="song-item">
                <div
                  className="song-info"
                  onClick={() => handleSongClick(songId)}
                >
                  <img src={imgUrl} alt={song.name} className="song-image" />
                  <div className="song-info-details">
                    <p className="song-name">{song.name} by</p>
                    <p className="song-artists">{song.artists}</p>
                    <p className="song-genre">{song.genre}</p>
                    <p className="song-likes">{song.SongLikesCnt} Likes</p>
                  </div>
                </div>

                <div className="song-buttons">
                  <div className="update-song-button">
                    <OpenModalLink
                      className="logo-link"
                      buttonText="Edit Song"
                      onItemClick={closeMenu}
                      modalComponent={<EditSongModal song={song} />}
                    />
                  </div>

                  <div className="delete-song-button">
                    <button onClick={() => toggleDeleteModal(songId)}>
                      Delete
                    </button>
                  </div>
                </div>
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
