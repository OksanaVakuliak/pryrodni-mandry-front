import { create } from 'zustand';

type StoriesState = {
  savedStories: Record<string, boolean>;
  storiesRate: Record<string, number>;

  setStorySaved: (id: string, value: boolean) => void;
  initStoryRate: (id: string, rate: number) => void;
  updateStoryRate: (id: string, delta: number) => void;
};

export const useStoriesStore = create<StoriesState>((set) => ({
  savedStories: {},
  storiesRate: {},

  setStorySaved: (id, value) =>
    set((state) => ({
      savedStories: {
        ...state.savedStories,
        [id]: value,
      },
    })),

  initStoryRate: (id, rate) =>
    set((state) => {
      if (state.storiesRate[id] !== undefined) return {};

      return {
        storiesRate: {
          ...state.storiesRate,
          [id]: rate,
        },
      };
    }),

  updateStoryRate: (id, delta) =>
    set((state) => ({
      storiesRate: {
        ...state.storiesRate,
        [id]: (state.storiesRate[id] ?? 0) + delta,
      },
    })),
}));
