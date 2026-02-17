export interface Song {
  id: string;
  title: string;
  prompt: string;
  genre: string;
  mood: string;
  duration: number;
  audioUrl: string | null;
  createdAt: Date;
  status: 'generating' | 'completed' | 'failed';
}

export interface GenerateParams {
  prompt: string;
  genre: string;
  mood: string;
  instrumental: boolean;
}

export const GENRES = [
  'Pop',
  'Rock',
  'Hip Hop',
  'Electronic',
  'Jazz',
  'Classical',
  'Folk',
  'R&B',
  'Country',
  'Metal'
] as const;

export const MOODS = [
  'Happy',
  'Sad',
  'Energetic',
  'Calm',
  'Dark',
  'Uplifting',
  'Mysterious',
  'Romantic'
] as const;
