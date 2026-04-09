import { create } from 'zustand';
import { User } from '@/types/user';
import { getMe, refresh } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useStoriesStore } from '@/lib/store/useStoriesStore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  setUser: (user) => {
    set({ user, isAuthenticated: true });

    try {
      const setStorySaved = useStoriesStore.getState().setStorySaved;
      if (user.savedArticles && user.savedArticles.length) {
        user.savedArticles.forEach((id) => setStorySaved(id, true));
      }
    } catch (error: unknown) {
      const err = error as AxiosError;
      const msg =
        err.message ?? 'Локальна синхронізація збережених статей не вдалася';
      toast.error(msg);
    }
  },

  clearUser: () => {
    set({ user: null, isAuthenticated: false });
    try {
      useStoriesStore.setState({ savedStories: {} });
    } catch (error: unknown) {
      const err = error as AxiosError;
      const msg = err?.message ?? 'Не вдалося очистити локальні збереження';
      toast.error(msg);
    }
  },

  checkAuth: async () => {
    try {
      const data = await getMe();

      set({ user: data, isAuthenticated: true });
      try {
        const setStorySaved = useStoriesStore.getState().setStorySaved;
        if (data.savedArticles && data.savedArticles.length) {
          data.savedArticles.forEach((id) => setStorySaved(id, true));
        }
      } catch (error: unknown) {
        const err = error as AxiosError;
        const msg =
          err?.message ?? 'Локальна синхронізація збережених статей не вдалася';
        toast.error(msg);
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401) {
        try {
          await refresh();
          const refreshed = await getMe();
          set({ user: refreshed, isAuthenticated: true });
        } catch (error: unknown) {
          const err = error as AxiosError;
          set({ user: null, isAuthenticated: false });
          toast.error(err.message);
        }
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
