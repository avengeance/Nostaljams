import { usePlayer } from "../../context/playerContext";

function QueueModal({ isOpen, onPlay }) {
    const { queue } = usePlayer();
    console.log("queue", queue);
    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
        {queue.map((song, idx) => (
            <div key={idx} onClick={() => onPlay(song)}>
                {song}
            </div>
            ))}
        </div>
        );
    }

export default QueueModal
