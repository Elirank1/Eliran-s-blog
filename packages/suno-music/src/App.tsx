import { GenerateForm } from './components/GenerateForm';
import { SongList } from './components/SongList';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Suno Music Generator</h1>
        <p>Create original music with AI - Describe your song and let the AI compose it for you</p>
      </header>

      <main className="app-main">
        <div className="container">
          <GenerateForm />
          <SongList />
        </div>
      </main>

      <footer className="app-footer">
        <p>
          Built with ❤️ by <a href="https://github.com/Elirank1" target="_blank" rel="noopener noreferrer">Eliran</a>
          {' · '}
          <a href="https://github.com/Elirank1/monorepo" target="_blank" rel="noopener noreferrer">Source Code</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
