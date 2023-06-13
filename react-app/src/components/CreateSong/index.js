import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as SongActions from "../../store/songs";

import "./CreateSong.css";
import { csrfFetch } from "../../store/csrf";
import Cookies from "js-cookie";

//need to add a way to also include a song image; if not, use a default image

function CreateSong() {
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

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

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
    console.log("upload_data", upload_data);
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

      if (newSong.ok) {
        const newSongId = newSong.id;
        const url = `/songs/${newSongId}`;
        setName("");
        setArtists("");
        setGenre("");
        setDescription("");
        setErrors([]);
        history.push(url);
      } else {
        setErrors(newSong);
      }
    } else {
      setErrors(upload_data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Artists
          <input
            type="text"
            value={artists}
            onChange={(e) => setArtists(e.target.value)}
          />
        </label>
        <label>
          Genre
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Song
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setSong(e.target.files[0])}
          />
        </label>
        <label>
          Album Art
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSongImage(e.target.files[0])}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}

export default CreateSong;
