import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./EditSong.css";

function EditSong() {
  const { id } = useParams();
  const user = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [artists, setArtists] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [audio_url, setAudio_Url] = useState("");
  const [image_url, setImage_Url] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchSong = async () => {
      const response = await dispatch(SongActions.getSongThunk(id));
      if (response) {
        const { name, artists, genre, description, audio_url, image_url } =
          response;
        setName(name);
        setArtists(artists);
        setGenre(genre);
        setDescription(description);
        setAudio_Url(audio_url);
        setImage_Url(image_url);
      }
    };

    fetchSong();
  }, [dispatch, id]);

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
    <>
      <form onSubmit={handleSubmit}>
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
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Song</label>
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
                <label>Album Art</label>
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
        <button>Submit</button>
      </form>
      {uploading && (
        <div>
          <h3>Please Wait while your Song is uploaded!</h3>
        </div>
      )}
    </>
  );
}

export default EditSong;
