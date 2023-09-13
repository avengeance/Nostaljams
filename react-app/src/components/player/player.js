import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./player.css";
import { usePlayer } from "../../context/playerContext";
import "./player.css";
import QueueModal from "./QueueModal";
import { useState, useEffect } from "react";
function Player() {
  const { curSong, setCurSong, queue, setQueue } = usePlayer();
  const [isModalOpen, setModalOpen] = useState(false);

  const handlePlayFromQueue = (song) => {
    setCurSong(song);
    setModalOpen(false);
  };
  const handleSongEnd = () => {
    if (queue.length > 0) {
      const nextSong = queue[0];
      setCurSong(nextSong);
      setQueue(prevQueue => prevQueue.slice(1));
    } else {
      console.log("Queue is empty, no song to play next.");
    }
  };
  useEffect(() => {
    console.log("Modal state: ", isModalOpen);
  }, [isModalOpen]);

  return (
    <div className="audioPlayer__cont">
      <div className='audioPlayer-content'>
      <button onClick={() => {
          console.log("Toggling Queue");
          setModalOpen(!isModalOpen);
      }}>Queue</button>
        <QueueModal isOpen={isModalOpen} onPlay={handlePlayFromQueue} />

      <AudioPlayer
        autoPlay
        src={curSong}
        onPlay={(e) => console.log("onPlay")}
        onEnded={handleSongEnd}
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
