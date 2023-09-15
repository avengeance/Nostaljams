// Constants
const SET_QUEUE = "player/SET_QUEUE";
const CLEAR_QUEUE = "player/CLEAR_QUEUE";
const ADD_QUEUE = "player/ADD_QUEUE";
const REMOVE_QUEUE = "player/REMOVE_QUEUE";

// Actions
const set_queue_action = (queue) => ({
  type: SET_QUEUE,
  queue,
});

const clear_queue_action = (queue) => ({
  type: CLEAR_QUEUE,
  queue,
});

const add_queue_action = (queue) => ({
  type: ADD_QUEUE,
  queue,
});

const remove_queue_action = (song) => ({
  type: REMOVE_QUEUE,
  song,
});

export const setQueueThunk = (playlist) => async (dispatch) => {
  let queue = [];

  if (playlist.length) {
    playlist.map((song) => {
      queue.push(song);
    });
  } else {
    queue.push(playlist);
  }

  dispatch(set_queue_action(queue));
  return;
};

export const clearQueueThunk = (queue) => async (dispatch) => {
  dispatch(clear_queue_action(queue));
  return;
};

export const addQueueThunk = (playlist) => async (dispatch) => {
  let queue = [];

  if (playlist.length) {
    playlist.map((song) => {
      queue.push(song);
    });
  } else {
    queue.push(playlist);
  }

  dispatch(add_queue_action(queue));
  return;
};

export const removeQueueThunk = (song) => async (dispatch) => {

  dispatch(remove_queue_action(song));
  return;
};

const queueReducer = (state = [], action) => {
  switch (action.type) {
    case SET_QUEUE:
      return action.queue;
    case ADD_QUEUE:
      return [...state, ...action.queue];
    case CLEAR_QUEUE:
      return [];
    case REMOVE_QUEUE:
      return state.filter((song) => song.id !== action.song.id);
    default:
      return state;
  }
};

export default queueReducer;
