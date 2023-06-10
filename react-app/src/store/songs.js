import { csrfFetch } from '../store/csrf';

// Constants
const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';
const GET_SONG = 'songs/GET_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const UPDATE_SONG = 'songs/UPDATE_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';
const GET_SONGS_BY_USER = 'songs/GET_SONGS_BY_USER';

// Actions
const getAllSongs = (songs) => ({
    type: GET_ALL_SONGS,
    songs,
})

const getSong = (song) => ({
    type: GET_SONG,
    song,
})

const createSong = (song) => ({
    type: CREATE_SONG,
    song,
})

const updateSong = (song) => ({
    type: UPDATE_SONG,
    song,
})

const deleteSong = (song) => ({
    type: DELETE_SONG,
    song,
})

const getSongsByUser = (songs) => ({
    type: GET_SONGS_BY_USER,
    songs,
})

// Thunks
export const getAllSongsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs',{
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getAllSongs(data));
    return data
}

export const getSongThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}`,{
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getSong(data));
    return data
}

export const createSongThunk = (song) => async (dispatch) => {
    const res = await csrfFetch('/api/songs/new',{
        method: 'POST',
        body: JSON.stringify(song),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    dispatch(createSong(data));
    return data
}

export const updateSongThunk = (song) => async (dispatch) => {
    const {name,artists,genre,description,audio_url} = song
    const res = await csrfFetch(`/api/songs/${song.id}`,{
        method: 'PUT',
        body: JSON.stringify(
            {
                name,
                artists,
                genre,
                description,
                audio_url
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateSong(data));
        return data
    }
}

export const deleteSongThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/delete`,{
        method: 'DELETE'
    });
        const data = await res.json();
        dispatch(deleteSong(data));
        return data

}

export const getSongsByUserThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/songs`,{
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getSongsByUser(data));
    return data
}

// Reducer
const initialState = { songs: [] };

const songsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_ALL_SONGS:
            newState.songs = action.songs;
            return newState;
        case GET_SONG:
            newState.song = action.song;
            return newState;
        case CREATE_SONG:
            newState.songs.push(action.song);
            return newState;
        case UPDATE_SONG:
            newState.song = action.song;
            return newState;
        case DELETE_SONG:
            newState.songs = newState.songs.filter(song => song.id !== action.song.id);
            return newState;
        case GET_SONGS_BY_USER:
            newState.songs = action.songs;
            return newState;
        default:
            return state;
    }
}

export default songsReducer
