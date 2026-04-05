import { create } from 'zustand';
import { User } from '@/types/Users';
import { getMe, refresh } from '@/lib/api/clientApi';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

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

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  checkAuth: async () => {
    try {
      const data = await getMe();

      set({
        user: data,
        isAuthenticated: true,
      });
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
