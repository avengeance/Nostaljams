import AudioPlayer from "react-h5-audio-player";
import 'react-h5-audio-player/lib/styles.css'
import "./player.css";
import { usePlayer } from "../../context/playerContext";

function Player() {
  // const {curSong, setCurSong} = usePlayer()

  return (
    <div className="audioPlayer__cont">
      <AudioPlayer
        autoPlay
        src={''}
        onPlay={(e) => console.log("onPlay")}
      />
    </div>
  );
}

export default Player;
