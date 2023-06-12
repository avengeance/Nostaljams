import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as PlaylistActions from "../../store/playlists";
import "./EditPlaylist.css";

const EditPlaylist = () => {
    const dispatch = useDispatch();
    const { playlistId } = useParams();
    const history = useHistory();

    const playlists = useSelector((state) => (state.playlists.playlists));
    console.log('this is playlist',playlists)
    // const playlist = playlists.find((playlist) => playlist.id === playlistId);
    const user = useSelector((state) => state.session.user);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    const currentPlaylist = useSelector((state) => state.playlists.currentPlaylist);

    useEffect(() => {
        dispatch(PlaylistActions.getPlaylistThunk(playlistId));
    }, [dispatch, playlistId]);

    // useEffect(() => {
    //     if (playlist) {
    //         setName(playlist.name);
    //         setDescription(playlist.description);
    //     }
    // }, [playlist]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            name,
            description,
        };
        const data = await dispatch(PlaylistActions.updatePlaylistThunk(payload, playlistId));
        if (data){
            history.push('/playlists/current');
        }
    }

    return(
        <>edit playlist</>
    )
}

export default EditPlaylist
