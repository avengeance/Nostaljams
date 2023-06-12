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
import SongDetail from "./components/SongDetail";
import CreateSong from "./components/CreateSong";
import UserSongs from "./components/UserSongs";
import UserPlaylist from "./components/UserPlaylist";
import DeleteModal from "./components/DeleteSong";
import Player from "./components/player/player";

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
          <Route path='/songs/:songId'>
            <SongDetail />
          </Route>
          <Route exact path='/users/:userId/songs'>
            <UserSongs/>
          </Route>
          <Route path='/users/:userId/playlists'>
            <UserPlaylist/>
          </Route>
          <Route path='/songs/:songId/delete'>
            <DeleteModal/>
          </Route>
        </Switch>
      )}
      <Player />
    </>
  );
}

export default App;
