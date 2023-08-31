import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./player.css";
import { usePlayer } from "../../context/playerContext";
import "./player.css";

function Player() {
  const { curSong, setCurSong } = usePlayer();

  return (
    <div className="audioPlayer__cont">
      <div className='audioPlayer-content'>
      <AudioPlayer
        autoPlay
        src={curSong}
        onPlay={(e) => console.log("onPlay")}
        layout={'horizontal-reverse' }
        showJumpControls={false} 
        style={{
          "box-shadow": "unset"
        }}
      />
      </div>
    </div>
  );
}

export default Player;
