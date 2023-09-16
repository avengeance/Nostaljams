import { createContext, useContext, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setQueueThunk } from "../store/player";
export const PlayerContext = createContext();

export function PlayerProvider(props) {
  const [curSong, setCurSong] = useState("");
  const [queue, setQueue] = useState([]);

  return (
    <PlayerContext.Provider value={{ curSong, setCurSong, queue, setQueue }}>
      {props.children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  const contextValues = useContext(PlayerContext);
  return contextValues;
};
