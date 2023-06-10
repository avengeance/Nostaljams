import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_PLAYLISTS = 'playlists/GET_ALL_PLAYLISTS';
const GET_PLAYLIST = 'playlists/GET_PLAYLIST';
const GET_USER_PLAYLISTS = 'playlists/GET_USER_PLAYLISTS';
const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST';
const UPDATE_PLAYLIST = 'playlists/UPDATE_PLAYLIST';
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST';

// Actions
const getAllPlaylists = (playlists) => ({
    type: GET_ALL_PLAYLISTS,
    playlists,
})

const getPlaylist = (playlist) => ({
    type: GET_PLAYLIST,
    playlist,
})

const getUserPlaylists = (playlists) => ({
    type: GET_USER_PLAYLISTS,
    playlists,
})

const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist,
})

const updatePlaylist = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist,
})

const deletePlaylist = (playlist) => ({
    type: DELETE_PLAYLIST,
    playlist,
})

// Thunks
// export const getAllPlaylistsThunk = () => async (dispatch) => {
//     const res = await csrfFetch('/api/playlists',{
//         method: 'GET'
//     });
//     const data = await res.json();
//     dispatch(getAllPlaylists(data));
//     return data
// }

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
        body: JSON.stringify(playlist)
    });
    const data = await res.json();
    dispatch(createPlaylist(data));
    return data
}

export const updatePlaylistThunk = (userId, playlist) => async (dispatch) => {
    const { name, description } = playlist
    const res = await csrfFetch(`/api/users/${userId}/playlists/${playlist.id}`, {
        method: 'PUT',
        body: JSON.stringify(
            {
                name,
                description
            }
        )
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
const initialState = { playlists: [] }

const playlistReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_ALL_PLAYLISTS:
            newState.playlists = action.playlists
            return newState
        case GET_PLAYLIST:
            newState.playlists = action.playlists
            return newState
        case GET_USER_PLAYLISTS:
            newState.playlists = action.playlists
            return newState
        case CREATE_PLAYLIST:
            newState.playlists.push(action.playlist)
            return newState
        case UPDATE_PLAYLIST:
            newState.playlists = newState.playlists.map(playlist => playlist.id === action.playlist.id ? action.playlist : playlist)
            return newState
        case DELETE_PLAYLIST:
            newState.playlists = newState.playlists.filter(playlist => playlist.id !== action.playlist.id)
            return newState
        default:
            return state;
    }
}

export default playlistReducer
