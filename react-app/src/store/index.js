import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import likesReducer from './likes';
import songsReducer from './songs';
import playlistsReducer from './playlists';
// import reducer from './session';
import commentsReducer from './comments';
import queueReducer from './player';


const rootReducer = combineReducers({
  // add reducer functions here
  session,
  likes: likesReducer,
  songs: songsReducer,
  playlists: playlistsReducer,
  comments: commentsReducer,
  queue: queueReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
