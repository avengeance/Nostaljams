import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as SongActions from "../../store/songs";
import "./EditSong.css";

function EditSongModal({ song }) {
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState(song.name);
  const [artists, setArtists] = useState(song.artists);
  const [genre, setGenre] = useState(song.genre);
  const [description, setDescription] = useState(song.description);

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      id:song.id,
      name,
      artists,
      genre,
      description,
    };
    const editSong = await dispatch(SongActions.updateSongThunk(payload));

    if (editSong.id) {
      const editSongId = editSong.id;
      const url = `/songs/${editSongId}`;
      setName("");
      setArtists("");
      setGenre("");
      setDescription("");
      setErrors([]);
      closeModal()
      history.push(url);
    } else {
      setErrors(editSong);
    }
  };

  return (
    <div className="song__modal">
      <form onSubmit={handleSubmit}>
        <h2>Update your Song!</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            {errors.artists && (
              <tr className="errors">
                <td>{errors.artists[0]}</td>
              </tr>
            )}
            <tr>
              <td>
                <label>Artists</label>
                <input
                  type="text"
                  value={artists}
                  onChange={(e) => setArtists(e.target.value)}
                />
              </td>
            </tr>
            {errors.name && (
              <tr className="errors">
                <td>{errors.name[0]}</td>
              </tr>
            )}
            <tr>
              <td>
                <label>Genre</label>
                <input
                  type="text"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
                <textarea
                  type="textarea"
                  value={description}
                  rows="5"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default EditSongModal;
