import { create } from 'zustand';
import type {
  AppView,
  AppSettings,
  JobDescription,
  Candidate,
  CandidateAnalysis,
  AnalysisLog,
} from '../types';

interface AppState {
  // Navigation
  currentView: AppView;
  setView: (view: AppView) => void;

  // Settings
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;

  // Job Description (current working JD for analyze tab)
  currentJob: JobDescription | null;
  setCurrentJob: (job: JobDescription | null) => void;

  // Saved Jobs (persisted)
  savedJobs: JobDescription[];
  saveJob: (job: JobDescription) => void;
  removeJob: (id: string) => void;

  // Candidates
  candidates: Candidate[];
  addCandidate: (candidate: Candidate) => void;
  removeCandidate: (id: string) => void;
  clearCandidates: () => void;

  // Analyses
  analyses: CandidateAnalysis[];
  addAnalysis: (analysis: CandidateAnalysis) => void;
  currentAnalysis: CandidateAnalysis | null;
  setCurrentAnalysis: (analysis: CandidateAnalysis | null) => void;
  updateAnalysisComment: (id: string, comment: string) => void;

  // History log
  analysisLog: AnalysisLog[];
  addToLog: (entry: AnalysisLog) => void;
  clearLog: () => void;

  // UI state
  isAnalyzing: boolean;
  setIsAnalyzing: (v: boolean) => void;
  analysisProgress: string;
  setAnalysisProgress: (msg: string) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const data = localStorage.getItem(`revital_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(`revital_${key}`, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable
  }
};

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation
  currentView: 'dashboard',
  setView: (view) => set({ currentView: view }),

  // Settings
  settings: loadFromStorage('settings', {
    apiKey: '',
    model: 'claude-sonnet-4-6',
    maxTokens: 4096,
    mode: 'auto' as const,
  }),
  updateSettings: (partial) => {
    const updated = { ...get().settings, ...partial };
    saveToStorage('settings', updated);
    set({ settings: updated });
  },

  // Job (current working JD)
  currentJob: null,
  setCurrentJob: (job) => set({ currentJob: job }),

  // Saved Jobs
  savedJobs: loadFromStorage('savedJobs', []),
  saveJob: (job) => {
    const existing = get().savedJobs;
    // Don't duplicate by id
    if (existing.some((j) => j.id === job.id)) return;
    const updated = [job, ...existing];
    saveToStorage('savedJobs', updated.slice(0, 50)); // keep last 50
    set({ savedJobs: updated });
  },
  removeJob: (id) => {
    const updated = get().savedJobs.filter((j) => j.id !== id);
    saveToStorage('savedJobs', updated);
    set({ savedJobs: updated });
  },

  // Candidates
  candidates: [],
  addCandidate: (candidate) =>
    set((s) => ({ candidates: [...s.candidates, candidate] })),
  removeCandidate: (id) =>
    set((s) => ({ candidates: s.candidates.filter((c) => c.id !== id) })),
  clearCandidates: () => set({ candidates: [] }),

  // Analyses
  analyses: loadFromStorage('analyses', []),
  addAnalysis: (analysis) => {
    const updated = [analysis, ...get().analyses];
    saveToStorage('analyses', updated.slice(0, 100)); // keep last 100
    set({ analyses: updated });
  },
  currentAnalysis: null,
  setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
  updateAnalysisComment: (id, comment) => {
    const updated = get().analyses.map((a) =>
      a.id === id ? { ...a, recruiterComment: comment } : a
    );
    saveToStorage('analyses', updated.slice(0, 100));
    set({ analyses: updated });
    // Also update currentAnalysis if it's the same one
    const current = get().currentAnalysis;
    if (current && current.id === id) {
      set({ currentAnalysis: { ...current, recruiterComment: comment } });
    }
  },

  // History log
  analysisLog: loadFromStorage('log', []),
  addToLog: (entry) => {
    const updated = [entry, ...get().analysisLog];
    saveToStorage('log', updated.slice(0, 200));
    set({ analysisLog: updated });
  },
  clearLog: () => {
    saveToStorage('log', []);
    set({ analysisLog: [] });
  },

  // UI
  isAnalyzing: false,
  setIsAnalyzing: (v) => set({ isAnalyzing: v }),
  analysisProgress: '',
  setAnalysisProgress: (msg) => set({ analysisProgress: msg }),
  error: null,
  setError: (msg) => set({ error: msg }),
}));
