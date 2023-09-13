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

const add_queue_action = (song) => ({
  type: ADD_QUEUE,
  song,
});

const remove_queue_action = (song) => ({
  type: REMOVE_QUEUE,
  song,
});

export const setQueueThunk = (queue) => async (dispatch) => {
  dispatch(set_queue_action(queue));
  return;
};

export const clearQueueThunk = (queue) => async (dispatch) => {
  dispatch(clear_queue_action(queue));
  return;
};

export const addQueueThunk = (song) => async (dispatch) => {
  dispatch(add_queue_action(song));
  return;
};

export const removeQueueThunk = (song) => async (dispatch) => {
  dispatch(remove_queue_action(song));
  return;
};

const queueReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_QUEUE:
        console.log(`addThunk ${action.song}`)
        state.push(action.song)
        return state
    default:
      return state;
  }
};

export default queueReducer;