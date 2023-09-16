import { usePlayer } from "../../context/playerContext";
import { useSelector } from "react-redux";

function QueueModal({ isOpen, onPlay }) {
  const { queue } = usePlayer();

  console.log(queue)

  return (
    <div className={`modal__queue ${isOpen ? "open" : "close"}`}>
      <ul>
        {queue[0]?.audioUrl ? (
          queue.map((song, idx) => (
            song.audioUrl ? (
              <li key={idx} onClick={() => onPlay(song.audioUrl)}>
                <p>
                  {song.name} - {song.artists}
                </p>
              </li>
            ) : null
          ))
        ) : (
          <li>Queue is Empty</li>
        )}
      </ul>
    </div>
  );
}

export default QueueModal;
