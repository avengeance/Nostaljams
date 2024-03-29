import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "./player.css";
import { usePlayer } from "../../context/playerContext";
import "./player.css";
import QueueModal from "./QueueModal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as PlayerActions from "../../store/player";

function Player() {
  const { curSong, setCurSong, queue, setQueue } = usePlayer();
  const queueState = useSelector((state) => state.queue);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setCurSong(queueState[0]);
    setQueue(queueState);
  }, [queueState]);

  const handlePlayFromQueue = (song) => {
    setCurSong(song);
    setModalOpen(false);
  };

  const handleSongEnd = () => {
    if (queue.length > 0) {
      dispatch(PlayerActions.removeQueueThunk(curSong))
      const nextSong = queue[0];
      setCurSong(nextSong);
      setQueue((prevQueue) => prevQueue.slice(1));
    } else {
      console.log("Queue is empty, no song to play next.");
    }
  };

  const handleClickNext = () => {
    if (queue.length > 1) {
      dispatch(PlayerActions.removeQueueThunk(curSong))
      const nextSong = queue[1];
      setCurSong(nextSong);
      setQueue((prevQueue) => prevQueue.slice(1));
    } else {
      alert("Queue is empty, no song to play next.");
      console.log("Queue is empty, no song to play next.");
    }
  };

  const handleClear = () => {
    setQueue("");
    setCurSong("");
    dispatch(PlayerActions.clearQueueThunk());
  };

  return (
    <div className="audioPlayer__cont">
      <div className="audioPlayer-content">
        <div className="audioPlayer-content__buttons">
          <button
            onClick={() => {
              setModalOpen(!isModalOpen);
            }}
          >
            Queue
          </button>
          <button
            onClick={() => {
              handleClear();
            }}
          >
            Clear Queue
          </button>
          {curSong && <img src={curSong.imgUrl[0].imgUrl} />}
        </div>
        <QueueModal isOpen={isModalOpen} onPlay={handlePlayFromQueue} />

        <AudioPlayer
          autoPlay
          src={curSong?.audioUrl}
          onEnded={handleSongEnd}
          layout={"horizontal-reverse"}
          showJumpControls={true}
          showSkipControls
          onClickNext={handleClickNext}
          style={{
            "box-shadow": "unset",
          }}
        />
      </div>
    </div>
  );
}

export default Player;
