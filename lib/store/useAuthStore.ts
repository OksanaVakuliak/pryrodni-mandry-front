import { create } from 'zustand';
import { User } from '@/types/Users';
import { clientApi } from '@/lib/api/api';
import { AxiosError } from 'axios';

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
      const { data } = await clientApi.get<User>('/api/profile/me');

      set({
        user: data,
        isAuthenticated: true,
      });
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401) {
        set({
          user: null,
          isAuthenticated: false,
        });
      }
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
