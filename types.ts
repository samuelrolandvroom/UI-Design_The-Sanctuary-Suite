export type ScreenName = 'narthex' | 'live-word' | 'roster' | 'choir' | 'deep-read' | 'intercession' | 'scriptorium' | 'liturgy';

export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Note {
  id: string;
  title: string;
  scripture?: string;
  content: string;
  timestamp: string;
  tags?: string[];
  audioUrl?: string; // URL to the blob
  duration?: string; // e.g. "0:42"
}

export interface ChoirTrack {
  id: string;
  name: string; // e.g., 'Soprano', 'Alto'
  isMuted: boolean;
  isSolo: boolean;
  volume: number;
}

export interface PrayerRequest {
  id: string;
  author: string;
  category: 'Sickness' | 'Grief' | 'Celebration' | 'World' | 'General';
  content: string;
  timestamp: string;
  prayCount: number;
  isPrayed: boolean; // Local user state
}

export interface ArchiveEntry {
  id: string;
  type: 'note' | 'scripture' | 'lyric';
  title: string;
  reference?: string; // e.g. "Matt 5:3" or "Hymn #42"
  preview: string;
  date: string;
  tags: string[];
}