import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_COMMENTS_BY_SONG = 'comments/GET_ALL_COMMENTS_BY_SONG';
const GET_COMMENT = 'comments/GET_COMMENT';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// Actions
const getAllCommentsBySong = (comments) => ({
    type: GET_ALL_COMMENTS_BY_SONG,
    comments,
})

const getComment = (comment) => ({
    type: GET_COMMENT,
    comment,
})

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    comment,
})

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
})

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment,
})

// Thunks
export const getAllCommentsBySongThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/comments`,{
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getAllCommentsBySong(data));
    return data
}

// export const getCommentThunk = (commentId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/comments/${commentId}`,{
//         method: 'GET'
//     });
//     const data = await res.json();
//     dispatch(getComment(data));
//     return data
// }

export const createCommentThunk = (songId, comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/comments/new`, {
        method: 'POST',
        body: JSON.stringify(comment),
    });
    const data = await res.json();
    dispatch(createComment(data));
    return data
}

export const updateCommentThunk = (commentId, comment) => async (dispatch) => {
    const { comment } = comment
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment
        }),
    });
    const data = await res.json();
    dispatch(updateComment(data));
    return data
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}/delete`, {
        method: 'DELETE',
    });
    const data = await res.json();
    dispatch(deleteComment(data));
    return data
}

// Reducer

const initialState = {};

const commentsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch (action.type) {
        case GET_ALL_COMMENTS_BY_SONG:
            newState = action.comments;
            return newState;
        case GET_COMMENT:
            newState = action.comment;
            return newState;
        case CREATE_COMMENT:
            newState = action.comment;
            return newState;
        case UPDATE_COMMENT:
            newState = action.comment;
            return newState;
        case DELETE_COMMENT:
            // filter through comments to delete comment?
            newState = action.comment;
            return newState;
        default:
            return state;
    }
}

export default commentsReducer
