import { Song, GenerateParams } from '../types';

export function generateMockSong(params: GenerateParams): Song {
  return {
    id: crypto.randomUUID(),
    title: generateTitle(params),
    prompt: params.prompt,
    genre: params.genre,
    mood: params.mood,
    duration: Math.floor(Math.random() * 120) + 120, // 2-4 minutes
    audioUrl: generateMockAudioUrl(),
    createdAt: new Date(),
    status: 'completed'
  };
}

function generateTitle(params: GenerateParams): string {
  const adjectives = ['Beautiful', 'Dreamy', 'Epic', 'Smooth', 'Vibrant', 'Gentle', 'Wild', 'Pure'];
  const nouns = ['Journey', 'Dreams', 'Memories', 'Echoes', 'Rhythm', 'Melody', 'Harmony', 'Vibes'];

  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj} ${noun}`;
}

function generateMockAudioUrl(): string {
  // In a real app, this would be the actual audio file URL
  // For now, we return a data URL with silence
  return 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
}
