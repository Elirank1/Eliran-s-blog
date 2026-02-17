import { useState } from 'react';
import { GENRES, MOODS, GenerateParams } from '../types';
import { useMusicStore } from '../store/musicStore';
import './GenerateForm.css';

export function GenerateForm() {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre] = useState(GENRES[0]);
  const [mood, setMood] = useState(MOODS[0]);
  const [instrumental, setInstrumental] = useState(false);

  const { generateSong, isGenerating } = useMusicStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!prompt.trim()) {
      alert('Please enter a description for your song');
      return;
    }

    const params: GenerateParams = {
      prompt: prompt.trim(),
      genre,
      mood,
      instrumental
    };

    await generateSong(params);
    setPrompt('');
  };

  return (
    <form className="generate-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>🎵 Create Your Music</h2>
        <p>Describe the song you want to create</p>
      </div>

      <div className="form-group">
        <label htmlFor="prompt">Song Description</label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A upbeat summer song about beach adventures with acoustic guitar..."
          rows={4}
          disabled={isGenerating}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            disabled={isGenerating}
          >
            {GENRES.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mood">Mood</label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            disabled={isGenerating}
          >
            {MOODS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={instrumental}
            onChange={(e) => setInstrumental(e.target.checked)}
            disabled={isGenerating}
          />
          <span>Instrumental (no vocals)</span>
        </label>
      </div>

      <button
        type="submit"
        className="generate-button"
        disabled={isGenerating || !prompt.trim()}
      >
        {isGenerating ? '⏳ Generating...' : '✨ Generate Song'}
      </button>
    </form>
  );
}
