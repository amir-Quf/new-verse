import { create } from "zustand";

interface PlayerState {
  currentPlayingId: number | null;
  setCurrentPlayingId: (id: number | null) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentPlayingId: null,
  setCurrentPlayingId: (id) => set({ currentPlayingId: id }),
}));
