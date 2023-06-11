import { csrfFetch } from "./csrf";

// Constants
const GET_PLAYLIST = 'playlists/GET_PLAYLIST';
const GET_USER_PLAYLISTS = 'playlists/GET_USER_PLAYLISTS';
const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST';
const UPDATE_PLAYLIST = 'playlists/UPDATE_PLAYLIST';
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST';

// Actions
const getPlaylist = (playlists) => ({
    type: GET_PLAYLIST,
    playlists,
})

const getUserPlaylists = (playlists) => ({
    type: GET_USER_PLAYLISTS,
    playlists,
})

const createPlaylist = (playlists) => ({
    type: CREATE_PLAYLIST,
    playlists,
})

const updatePlaylist = (playlists) => ({
    type: UPDATE_PLAYLIST,
    playlists,
})

const deletePlaylist = (playlists) => ({
    type: DELETE_PLAYLIST,
    playlists,
})

// Thunks
export const getPlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}`, {
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getPlaylist(data));
    return data
}

export const getUserPlaylistsThunk = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/playlists`, {
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getUserPlaylists(data));
    return data
}

export const createPlaylistThunk = (userId, playlist) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/playlists/new`, {
        method: 'POST',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    dispatch(createPlaylist(data));
    return data
}

export const updatePlaylistThunk = (userId, playlist) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/playlists/${playlist.id}`, {
        method: 'PUT',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updatePlaylist(data));
        return data
    }
}

export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/delete`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(deletePlaylist(data));
    return data
}

// Reducer
const initialState = { playlists: { user: {} } }

const playlistReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_PLAYLIST:
            newState.playlists[action.playlists.id] = action.playlists
            return newState;
        case GET_USER_PLAYLISTS:
            if (action.playlists.User) {
                action.playlists.User.forEach((playlist) => {
                newState.playlists.user[playlist.id] = playlist;
                });
            }
            return newState;
        case CREATE_PLAYLIST:
            newState.playlists[action.playlists.id] = action.playlists
            return newState;
        case UPDATE_PLAYLIST:
            //newState.playlists = newState.playlists.map(playlist => playlist.id === action.playlist.id ? action.playlist : playlist)
            newState.playlists[action.playlists.id] = action.playlists
            return newState;
        case DELETE_PLAYLIST:
            //newState.playlists = newState.playlists.filter(playlist => playlist.id !== action.playlist.id)
            delete newState[action.songs.id]
            return newState;
        default:
            return state;
    }
}

export default playlistReducer
