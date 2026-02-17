import { create } from 'zustand';
import { Song, GenerateParams } from '../types';
import { generateMockSong } from '../utils/mockGenerator';

interface MusicStore {
  songs: Song[];
  currentSong: Song | null;
  isGenerating: boolean;
  generateSong: (params: GenerateParams) => Promise<void>;
  setCurrentSong: (song: Song | null) => void;
  deleteSong: (id: string) => void;
}

export const useMusicStore = create<MusicStore>((set, get) => ({
  songs: [],
  currentSong: null,
  isGenerating: false,

  generateSong: async (params: GenerateParams) => {
    set({ isGenerating: true });

    // Create initial song with generating status
    const newSong: Song = {
      id: crypto.randomUUID(),
      title: `${params.mood} ${params.genre} Song`,
      prompt: params.prompt,
      genre: params.genre,
      mood: params.mood,
      duration: 0,
      audioUrl: null,
      createdAt: new Date(),
      status: 'generating'
    };

    set(state => ({
      songs: [newSong, ...state.songs]
    }));

    // Simulate generation (in real app, this would call an API)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const completedSong = generateMockSong(params);

      set(state => ({
        songs: state.songs.map(s => s.id === newSong.id ? completedSong : s),
        isGenerating: false
      }));
    } catch (error) {
      set(state => ({
        songs: state.songs.map(s =>
          s.id === newSong.id ? { ...s, status: 'failed' as const } : s
        ),
        isGenerating: false
      }));
    }
  },

  setCurrentSong: (song: Song | null) => {
    set({ currentSong: song });
  },

  deleteSong: (id: string) => {
    set(state => ({
      songs: state.songs.filter(s => s.id !== id),
      currentSong: state.currentSong?.id === id ? null : state.currentSong
    }));
  }
}));
