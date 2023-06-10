import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import * as commentActions from "./store/comments";
import * as playlistActions from "./store/playlists";
import * as songActions from "./store/songs";
import * as likeActions from "./store/likes";


import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Navigation from "./components/Navigation";
import Song from "./components/Song";
import CreateSong from "./components/CreateSong";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.authenticate()).then(() => setIsLoaded(true));
    dispatch(songActions.getSongThunk());
    setIsLoaded(true);
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <Song />
          </Route>
          <Route exact path='/songs/new'>
            <CreateSong />
          </Route>
          <Route exact path='/users/:userId/songs'>

          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
