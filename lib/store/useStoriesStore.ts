import { create } from 'zustand';

type StoriesState = {
  savedStories: Record<string, boolean>;
  storiesRate: Record<string, number>;

  setStorySaved: (storyId: string, isSaved: boolean) => void;
  initStoryRate: (storyId: string, rate: number) => void;
};

export const useStoriesStore = create<StoriesState>((set) => ({
  savedStories: {},
  storiesRate: {},

  initStoryRate: (storyId, rate) =>
    set((state) => ({
      storiesRate: {
        ...state.storiesRate,
        [storyId]: state.storiesRate[storyId] ?? rate,
      },
    })),

  setStorySaved: (storyId, isSaved) =>
    set((state) => {
      const prevSaved = state.savedStories[storyId];
      const currentRate = state.storiesRate[storyId] ?? 0;

      let newRate = currentRate;

      if (prevSaved !== isSaved) {
        newRate = isSaved ? currentRate + 1 : currentRate - 1;
      }

      return {
        savedStories: {
          ...state.savedStories,
          [storyId]: isSaved,
        },
        storiesRate: {
          ...state.storiesRate,
          [storyId]: newRate,
        },
      };
    }),
}));
