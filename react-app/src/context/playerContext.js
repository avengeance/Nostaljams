import { createContext, useContext, useState } from "react";

export const PlayerContext = createContext()

export const usePlayer = () => useContext(PlayerContext)

export default function PlayerProvider(props){
    const [curSong, setCurSong] = useState('')

    return(
        <PlayerContext.Provider
        value={{curSong,setCurSong}}
        >
            {props.children}
        </PlayerContext.Provider>
    )
}