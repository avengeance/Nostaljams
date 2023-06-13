import React, { useState } from "react";
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

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("audio", song);
    formData.append("image", songImage);

    setUploading(true);

    try {
      const res = await fetch("/api/songs/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const upload_data = res.json();
        console.log(upload_data);
      }
    } catch (res) {
      //   const data = await res.json();
      //   setErrors(res.data.errors);
    }

    const payload = {
      name,
      artists,
      genre,
      description,
    };

    // let newSong;

    // try {
    //   const song = await dispatch(SongActions.createSongThunk(payload));
    //   const newSongId = song.id;
    //   const url = `/songs/${newSongId}`;
    //   if (song) {
    //     newSong = song;
    //     setName("");
    //     setArtists("");
    //     setGenre("");
    //     setDescription("");
    //     setErrors([]);
    //     history.push(url);
    //   }
    // } catch (res) {
    //   const data = await res.json();
    //   setErrors(res.data.errors);
    // }
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
