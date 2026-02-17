# 🎵 Suno Music Generator

An AI-powered music generation application inspired by Suno. Create original songs from text descriptions with customizable genres, moods, and styles.

## Features

- 🎼 **AI Music Generation** - Create songs from text prompts
- 🎸 **Multiple Genres** - Pop, Rock, Hip Hop, Electronic, Jazz, and more
- 🎭 **Mood Selection** - Happy, Sad, Energetic, Calm, Dark, Uplifting, etc.
- 🎹 **Instrumental Mode** - Generate music without vocals
- 📝 **Song Library** - Keep track of all your generated songs
- ⚡ **Fast & Responsive** - Modern React UI with smooth interactions
- 🌙 **Dark Mode** - Automatic dark theme support

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **CSS Variables** - Theme system

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── GenerateForm.tsx
│   │   ├── GenerateForm.css
│   │   ├── SongList.tsx
│   │   └── SongList.css
│   ├── store/
│   │   └── musicStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── mockGenerator.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── public/
│   └── music-icon.svg
├── index.html
└── package.json
```

## How It Works

1. **Describe Your Song** - Enter a text description of the music you want
2. **Choose Style** - Select genre and mood from the dropdowns
3. **Generate** - Click the generate button and wait ~3 seconds
4. **Listen & Enjoy** - Play your generated songs from the library

## Future Enhancements

- [ ] Real AI music generation API integration (Suno, MusicGen, etc.)
- [ ] Audio player with controls
- [ ] Download generated songs
- [ ] Share songs with links
- [ ] User accounts and cloud storage
- [ ] Collaboration features
- [ ] Advanced audio editing

## API Integration

Currently uses mock data for demonstration. To integrate with a real music generation API:

1. Replace `generateMockSong()` in `utils/mockGenerator.ts`
2. Add API credentials to environment variables
3. Update the `generateSong()` function in `store/musicStore.ts`

Example APIs:
- [Suno AI](https://suno.com)
- [MusicGen by Meta](https://github.com/facebookresearch/audiocraft)
- [Stable Audio](https://www.stableaudio.com)

## License

MIT
