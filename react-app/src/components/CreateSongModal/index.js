import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as SongActions from "../../store/songs";

import "./CreateSong.css";
import { csrfFetch } from "../../store/csrf";
import Cookies from "js-cookie";

//need to add a way to also include a song image; if not, use a default image

function CreateSongModal() {
  const user = useSelector((state) => state.session.user);

  const [song, setSong] = useState();
  const [songImage, setSongImage] = useState();

  const [uploading, setUploading] = useState(false);

  const [name, setName] = useState("");
  const [artists, setArtists] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    formData.append("audio", song);
    formData.append("image", songImage);

    setUploading(true);
    const res = await fetch("/api/songs/upload", {
      method: "POST",
      body: formData,
    });

    const upload_data = await res.json();
    if (res.ok) {
      const payload = {
        name,
        artists,
        genre,
        description,
        audio_url: upload_data.audio_url,
        image_url: upload_data.image_url,
      };
      const newSong = await dispatch(SongActions.createSongThunk(payload));

      if (newSong.id) {
        const newSongId = newSong.id;
        const url = `/songs/${newSongId}`;
        setName("");
        setArtists("");
        setGenre("");
        setDescription("");
        setErrors([]);
        history.push(url);
      } else {
        setUploading(false);
        setErrors(newSong);
      }
    } else {
      setUploading(false);
      setErrors(upload_data);
    }
  };

  return (
    <div className="song__modal">
      <form onSubmit={handleSubmit}>
        <h2>Upload your Song!</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name your Song!"
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
                <label>Artist</label>
                <input
                  type="text"
                  placeholder="Who made your Song?"
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
                  placeholder="What is your Song like?"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Description</label>
                <input
                  type="text"
                  placeholder="Tell us your Song!"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <h2>Upload your Audio file!</h2>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setSong(e.target.files[0])}
                />
              </td>
            </tr>
            {errors.Song && (
              <tr className="errors">
                <td>{errors.Song}</td>
              </tr>
            )}
            <tr>
              <td>
                <h2>Upload your Album Art!</h2>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSongImage(e.target.files[0])}
                />
              </td>
            </tr>
            {errors.Image && (
              <tr className="errors">
                <td>{errors.Image}</td>
              </tr>
            )}
          </tbody>
        </table>
        <button>Upload your Song!</button>
      </form>
      {uploading && (
        <div className="song__modal__uploading">
          <h3>Please Wait while your Song is uploaded!</h3>
        </div>
      )}
    </div>
  );
}

export default CreateSongModal;
