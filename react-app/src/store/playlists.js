import {csrfFetch} from "./csrf";

// Constants
const GET_PLAYLIST = 'playlists/GET_PLAYLIST';
const GET_USER_PLAYLISTS = 'playlists/GET_USER_PLAYLISTS';
const CREATE_PLAYLIST = 'playlists/CREATE_PLAYLIST';
const UPDATE_PLAYLIST = 'playlists/UPDATE_PLAYLIST';
const DELETE_PLAYLIST = 'playlists/DELETE_PLAYLIST';
const ADD_SONG_TO_PLAYLIST = 'playlists/ADD_SONG_TO_PLAYLIST';
const DELETE_SONG_FROM_PLAYLIST = 'playlists/DELETE_SONG_FROM_PLAYLIST';

// Actions
const getPlaylist = (playlists) => ({
    type: GET_PLAYLIST,
    playlists,
})

const getUserPlaylists = (playlists) => ({
    type: GET_USER_PLAYLISTS,
    playlists,
})

const createPlaylist = (playlist) => ({
    type: CREATE_PLAYLIST,
    playlist,
});


const updatePlaylist = (playlists) => ({
    type: UPDATE_PLAYLIST,
    playlists,
})

const deletePlaylist = (playlists) => ({
    type: DELETE_PLAYLIST,
    playlists,
})

const addSongToPlaylist = (playlistId, song) => ({
    type: ADD_SONG_TO_PLAYLIST,
    playlistId,
    song,
});

const deleteSongFromPlaylist = (playlistId, songId) => ({
    type: DELETE_SONG_FROM_PLAYLIST,
    playlistId,
    songId,
});

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
    await dispatch(getUserPlaylistsThunk(userId));
    return data
}

export const updatePlaylistThunk = (userId, playlist) => async (dispatch) => {
    const res = await csrfFetch(`/api/users/${userId}/playlists/${playlist.id}/edit`, {
        method: 'PUT',
        body: JSON.stringify(playlist),
        headers: {
            'Content-Type': 'application/json'
        }
        });

        if (res.ok) {
        const data = await res.json();
        dispatch(updatePlaylist(data));
        await dispatch(getUserPlaylistsThunk(userId));
        return data;
        }
    };


export const deletePlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/delete`, {
        method: 'DELETE'
    });
    const data = await res.json();
    dispatch(deletePlaylist(data));
    return data
}

export const addSongToPlaylistThunk = (playlistId, song) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/songs`, {
        method: 'POST',
        body: JSON.stringify(song),
        headers: {
            'Content-Type': 'application/json',
        },
        });
        if (res.ok) {
        const data = await res.json();
        dispatch(addSongToPlaylist(playlistId, data));
        return data;
        }
    };
export const deleteSongFromPlaylistThunk = (playlistId, songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/songs/${songId}`, {
        method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
        dispatch(deleteSongFromPlaylist(playlistId, songId));
        return data;
        }
    };

// Reducer
const initialState = { playlists: { user: {} } }

const playlistReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_PLAYLIST:
            newState.playlists[action.playlists.id] = action.playlists
            return newState;
        case GET_USER_PLAYLISTS:
            action.playlists.forEach((playlist) => {
                newState.playlists.user[playlist.id] = playlist;
            });
            return newState;
        case CREATE_PLAYLIST:
                newState.playlists.user[action.playlist.id] = action.playlist;
                return newState;
        case UPDATE_PLAYLIST:
            newState.playlists.user[action.playlists.id] = action.playlists
            return newState;
        case DELETE_PLAYLIST:
            const { [action.playlists.id]: deletedPlaylist, ...updatedPlaylists } = newState.playlists;
            newState.playlists = updatedPlaylists;
            return newState;
        case ADD_SONG_TO_PLAYLIST:
            const playlistToUpdate = newState.playlists.user[action.playlistId];
            if (playlistToUpdate) {
                playlistToUpdate.songs.push(action.song);
            }
            return newState;
        case DELETE_SONG_FROM_PLAYLIST:
            const playlist = newState.playlists.user[action.playlistId];
            if (playlist) {
                playlist.songs = playlist.songs.filter((songId) => songId !== action.songId);
            }
            return newState;
        default:
            return state;
    }
}

export default playlistReducer
