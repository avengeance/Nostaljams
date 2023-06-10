import { csrfFetch } from "./csrf";

// Constants
const GET_LIKES_BY_SONG = 'likes/GET_LIKES_BY_SONG';
const GET_LIKES_BY_PLAYLIST = 'likes/GET_LIKES_BY_PLAYLIST';
const CREATE_SONG_LIKE = 'likes/CREATE_SONG_LIKE';
const CREATE_PLAYLIST_LIKE = 'likes/CREATE_PLAYLIST_LIKE';
const DELETE_LIKE_BY_PLAYLIST = 'likes/DELETE_LIKE_BY_PLAYLIST';
const DELETE_LIKE_BY_SONG = 'likes/DELETE_LIKE_BY_SONG';

// Actions
const getLikesBySong = (likes) => ({
    type: GET_LIKES_BY_SONG,
    likes,
})

const getLikesByPlaylist = (likes) => ({
    type: GET_LIKES_BY_PLAYLIST,
    likes,
})

const createSongLike = (like) => ({
    type: CREATE_SONG_LIKE,
    like,
})

const createPlaylistLike = (like) => ({
    type: CREATE_PLAYLIST_LIKE,
    like,
})

const deleteLikeByPlaylist = (like) => ({
    type: DELETE_LIKE_BY_PLAYLIST,
    like,
})

const deleteLikeBySong = (like) => ({
    type: DELETE_LIKE_BY_SONG,
    like,
})

// Thunks
export const getLikesBySongThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/likes`,{
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getLikesBySong(data));
    return data
}

export const getLikesByPlaylistThunk = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/likes`,{
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getLikesByPlaylist(data));
    return data
}

export const createSongLikeThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/likes/new`,{
        method: 'POST',
        body: JSON.stringify(like)
    });
    const data = await res.json();
    dispatch(createSongLike(data));
    return data
}

export const createPlaylistLikeThunk = (playlistId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/likes/new`,{
        method: 'POST',
        body: JSON.stringify(like)
    });
    const data = await res.json();
    dispatch(createPlaylistLike(data));
    return data
}

export const deleteLikeByPlaylistThunk = (playlistId, likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/playlists/${playlistId}/likes/${likeId}/delete`,{
        method: 'DELETE',
        body: JSON.stringify(like)
    });
    const data = await res.json();
    dispatch(deleteLikeByPlaylist(data));
    return data
}

export const deleteLikeBySongThunk = (songId, likeId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/likes/${likeId}/delete`,{
        method: 'DELETE',
        body: JSON.stringify(like)
    });
    const data = await res.json();
    dispatch(deleteLikeBySong(data));
    return data
}

// Reducer
const initialState = {
    likesBySong: [],
    likesByPlaylist: [],
}

const likesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_LIKES_BY_SONG:
            newState.likesBySong = action.likes;
            return newState;
        case GET_LIKES_BY_PLAYLIST:
            newState.likesByPlaylist = action.likes;
            return newState;
        case CREATE_SONG_LIKE:
            newState.likesBySong.push(action.like);
            return newState;
        case CREATE_PLAYLIST_LIKE:
            newState.likesByPlaylist.push(action.like);
            return newState;
        case DELETE_LIKE_BY_PLAYLIST:
            newState.likesByPlaylist = newState.likesByPlaylist.filter(like => like.id !== action.like.id);
            return newState;
        case DELETE_LIKE_BY_SONG:
            newState.likesBySong = newState.likesBySong.filter(like => like.id !== action.like.id);
            return newState;
        default:
            return state;
    }
}

export default likesReducer
