import { csrfFetch } from '../store/csrf';

// Constants
const GET_ALL_SONGS = 'songs/GET_ALL_SONGS';
const GET_SONG = 'songs/GET_SONG';
const CREATE_SONG = 'songs/CREATE_SONG';
const UPDATE_SONG = 'songs/UPDATE_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';
const GET_SONGS_BY_USER = 'songs/GET_SONGS_BY_USER';
const GET_SONGS_BY_PLAYLIST = 'songs/GET_SONGS_BY_PLAYLIST';

// Actions
const getAllSongs = (songs) => ({
    type: GET_ALL_SONGS,
    songs,
})

const getSong = (songs) => ({
    type: GET_SONG,
    songs,
})

const createSong = (songs) => ({
    type: CREATE_SONG,
    songs,
})

const updateSong = (songs) => ({
    type: UPDATE_SONG,
    songs,
})

const deleteSong = (songs) => ({
    type: DELETE_SONG,
    songs,
})

const getSongsByUser = (songs) => ({
    type: GET_SONGS_BY_USER,
    songs,
})

const getSongsByPlaylist = (songs) => ({
    type: GET_SONGS_BY_PLAYLIST,
    songs,
});

// Thunks
export const getAllSongsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/songs', {
        method: 'GET'
    });
    const data = await res.json();
    let songs = {}
    data.Songs.forEach(song => {
        songs[song.id] = song
    })
    dispatch(getAllSongs(data));
    return data
}

export const getSongThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}`, {
        method: 'GET'
    });
    const songDetails = await res.json();
    dispatch(getSong(songDetails));
    return songDetails
}

export const createSongThunk = (song) => async (dispatch) => {
    const res = await fetch('/api/songs/new', {
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
    const res = await csrfFetch(`/api/songs/${song.id}/edit`, {
        method: 'PUT',
        body: JSON.stringify(song),
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
    const res = await csrfFetch(`/api/songs/${songId}/delete`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(deleteSong(data));
    return data

}

export const getSongsByUserThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/songs`, {
        method: 'GET'
    });
    const data = await res.json();
    // console.log(data);
    dispatch(getSongsByUser(data));
    return data
}

export const getSongsByPlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${playlistId}/playlist`, {
        method: 'GET',
    });
    if (!res.ok) {
        // Handle error if necessary
        return;
    }
    const data = await res.json();
    // Dispatch an action to update the state with the fetched songs
    dispatch(getSongsByPlaylist(data));
    return data;
};

// Reducer
const initialState = {
    songs: { user: {} }
};

const songsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_SONGS:
            action.songs.Songs.forEach((song) => {
                newState.songs[song.id] = song
            })
            return newState;
        case GET_SONG:
            newState.songs[action.songs.songId] = action.songs
            return newState;
        case CREATE_SONG:
            newState.songs[action.songs.id] = action.songs
            return newState;
        case UPDATE_SONG:
            newState.songs[action.songs.id] = action.songs
            return newState;
        case DELETE_SONG:
            const { [action.songs.id]: deletedSong, ...updatedSongs } = newState.songs;
            newState.songs = updatedSongs;
            return newState;
        case GET_SONGS_BY_USER:
            // console.log(action.songs.UserSongs);
            action.songs.UserSongs.forEach((song) => {
                newState.songs.user[song.id] = song
            })
            return newState;
        case GET_SONGS_BY_PLAYLIST:
            action.songs.forEach((song) => {
                newState.songs[song.id] = song;
            });
            return newState;
        default:
            return state;
    }
}

export default songsReducer
