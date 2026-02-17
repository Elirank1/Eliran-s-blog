import { useMusicStore } from '../store/musicStore';
import { Song } from '../types';
import './SongList.css';

export function SongList() {
  const { songs, currentSong, setCurrentSong, deleteSong } = useMusicStore();

  if (songs.length === 0) {
    return (
      <div className="song-list-empty">
        <p>🎼 No songs yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="song-list">
      <h2>Your Songs ({songs.length})</h2>
      <div className="songs-grid">
        {songs.map(song => (
          <SongCard
            key={song.id}
            song={song}
            isPlaying={currentSong?.id === song.id}
            onPlay={() => setCurrentSong(song)}
            onDelete={() => deleteSong(song.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface SongCardProps {
  song: Song;
  isPlaying: boolean;
  onPlay: () => void;
  onDelete: () => void;
}

function SongCard({ song, isPlaying, onPlay, onDelete }: SongCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`song-card ${isPlaying ? 'playing' : ''}`}>
      <div className="song-status">
        {song.status === 'generating' && <span className="status generating">⏳ Generating...</span>}
        {song.status === 'failed' && <span className="status failed">❌ Failed</span>}
        {song.status === 'completed' && <span className="status completed">✅</span>}
      </div>

      <h3>{song.title}</h3>

      <div className="song-meta">
        <span className="genre">{song.genre}</span>
        <span className="mood">{song.mood}</span>
      </div>

      <p className="song-prompt">{song.prompt}</p>

      {song.status === 'completed' && (
        <>
          <div className="song-duration">{formatDuration(song.duration)}</div>
          <div className="song-actions">
            <button
              className="play-button"
              onClick={onPlay}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>
            <button
              className="delete-button"
              onClick={onDelete}
              title="Delete song"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
}
