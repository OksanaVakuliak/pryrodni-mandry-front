import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoriesState {
  savedStories: Record<string, boolean>;
  setStorySaved: (id: string, isSaved: boolean) => void;
}

export const useStoriesStore = create<StoriesState>()(
  persist(
    (set) => ({
      savedStories: {},
      setStorySaved: (id, isSaved) =>
        set((state) => ({
          savedStories: { ...state.savedStories, [id]: isSaved },
        })),
    }),
    {
      name: 'saved-stories',
    },
  ),
);
