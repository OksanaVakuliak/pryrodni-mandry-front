import { create } from 'zustand';

interface StoriesState {
  savedStories: Record<string, boolean>;
  setStorySaved: (id: string, isSaved: boolean) => void;
}

export const useStoriesStore = create<StoriesState>((set) => ({
  savedStories: {},
  setStorySaved: (id, isSaved) =>
    set((state) => ({
      savedStories: { ...state.savedStories, [id]: isSaved },
    })),
}));