import { usePlayer } from "../../context/playerContext";
import { useDispatch } from "react-redux";
import * as PlayerActions from "../../store/player";

function QueueModal({ isOpen, onPlay }) {
  const { queue, setCurSong } = usePlayer();
  const dispatch = useDispatch();

  const handleRemove = (song) => {
    dispatch(PlayerActions.removeQueueThunk(song));
  };

  return (
    <div className={`modal__queue ${isOpen ? "open" : "close"}`}>
      <ul>
        {queue[0]?.audioUrl ? (
          queue.map((song, idx) =>
            song.audioUrl ? (
              <li key={idx} onClick={() => setCurSong(song)}>
                <img
                  className="modal__queue__img"
                  src={song.imgUrl[0].imgUrl}
                />
                <p>
                  {song.name} - {song.artists}
                </p>
                <i
                  onClick={() => handleRemove(song)}
                  className="fas fa-times-circle"
                ></i>
              </li>
            ) : null
          )
        ) : (
          <li className="modal__queue__empty">
            <img />
            <p>Queue is Empty</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default QueueModal;
