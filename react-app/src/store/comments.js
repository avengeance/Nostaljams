import { csrfFetch } from "./csrf";

// Constants
const GET_ALL_COMMENTS_BY_SONG = 'comments/GET_ALL_COMMENTS_BY_SONG';
const CREATE_COMMENT = 'comments/CREATE_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// Actions
const getAllCommentsBySong = (comments) => ({
    type: GET_ALL_COMMENTS_BY_SONG,
    comments,
})

const createComment = (comments) => ({
    type: CREATE_COMMENT,
    comments,
})

const updateComment = (comments) => ({
    type: UPDATE_COMMENT,
    comments,
})

const deleteComment = (comments) => ({
    type: DELETE_COMMENT,
    comments,
})

// Thunks
export const getAllCommentsBySongThunk = (songId) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: 'GET'
    });
    const data = await res.json();
    dispatch(getAllCommentsBySong(data));
    return data
}

export const createCommentThunk = (songId, comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/songs/${songId}/comments/new`, {
        method: 'POST',
        body: JSON.stringify({ comment: comment }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    dispatch(createComment(data));
    return data
}

export const updateCommentThunk = (commentId, comment) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
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

const initialState = { comments: [] };

const commentsReducer = (state = initialState, action) => {
    let newState = { ...state };
    switch (action.type) {
        case GET_ALL_COMMENTS_BY_SONG:
            // newState = action.comments;
            action.comments.forEach((comment) => {
                newState.comments[comment.id] = comment
            })
            return newState;
        case CREATE_COMMENT:
            // newState.comments[action.comments.id] = action.comments;
            newState.comments.push(action.comments)
            return newState;
        case UPDATE_COMMENT:
            // newState.comments[action.comments.id] = action.comments;
            const indexToUpdate = newState.comments.findIndex(comment => comment.id === action.comments.id);
            if (indexToUpdate !== -1) {
                newState.comments[indexToUpdate] = action.comments;
            }
            return newState;
        case DELETE_COMMENT:
            // filter through comments to delete comment?
            delete newState[action.comments.id]
            return newState;
        default:
            return state;
    }
}

export default commentsReducer
