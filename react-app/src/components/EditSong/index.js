import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as SongActions from "../../store/songs";
import "./EditSong.css";

function EditSong() {
  const idParam = useParams();
  const id =idParam.songId
  const user = useSelector((state) => state.session.user);

  const [song, setSong] = useState();

  const [name, setName] = useState("");
  const [artists, setArtists] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");

  const [nameCur, setNameCur] = useState("");
  const [artistsCur, setArtistsCur] = useState("");
  const [genreCur, setGenreCur] = useState("");
  const [descriptionCur, setDescriptionCur] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const fetchSong = async () => {
      const response = await dispatch(SongActions.getSongThunk(id));
      if (response) {
        const { name, artists, genre, description, audio_url, image_url } =
          response;
        setSong(response);
        setNameCur(name);
        setArtistsCur(artists);
        setGenreCur(genre);
        setDescriptionCur(description);
      }
    };

    setIsLoaded(true);
    fetchSong();
  }, [dispatch, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      id,
      name,
      artists,
      genre,
      description,
    };
    const newSong = await dispatch(SongActions.updateSongThunk(payload));

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
      setErrors(newSong);
    }
  };

  return (
    <>
      {isLoaded && (
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder={nameCur}
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
                    placeholder={artistsCur}
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
                    placeholder={genreCur}
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
                    placeholder={descriptionCur}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button>Submit</button>
        </form>
      )}
    </>
  );
}

export default EditSong;
