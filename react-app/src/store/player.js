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

export const setQueueThunk = (queue) => async (dispatch) => {
  console.log(`setQueueThunk ${queue}`);
  dispatch(set_queue_action(queue));
  return;
};

export const clearQueueThunk = (queue) => async (dispatch) => {
  dispatch(clear_queue_action(queue));
  return;
};

export const addQueueThunk = (queue) => async (dispatch) => {
  console.log("Songs to be added in action:", queue);

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
      console.log("Current state before adding:", state);
      console.log("Songs to be added in reducer:", action.queue);
      return [...state, ...action.queue];
      // console.log(`addThunk ${action.queue}`);
      // action.queue.map((song) => {
      //   state.push(song);
      // });
      // return state;
    case CLEAR_QUEUE:
      return [];
    case REMOVE_QUEUE:
      return state.filter(song => song.id !== action.song.id);
    default:
      return state;
  }
};

export default queueReducer;
