import { createContext, useContext, useState } from "react";

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
  return useContext(PlayerContext);
};

// export const usePlayer = () => useContext(PlayerContext);
