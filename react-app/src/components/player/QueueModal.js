import { usePlayer } from "../../context/playerContext";

function QueueModal({ isOpen, onPlay }) {
  const { queue } = usePlayer();

  console.log(queue);

  return (
    <div className={`modal__queue ${isOpen ? "open" : "close"}`}>
      <ul>
        {queue[0]?.audioUrl ? (
          queue.map((song, idx) => (
            <li key={idx} onClick={() => onPlay(song.audioUrl)}>
              <p>
                {song.name} - {song.artists}
              </p>
            </li>
          ))
        ) : (
          <li>Queue is Empty</li>
        )}
      </ul>
    </div>
  );
}

export default QueueModal;
