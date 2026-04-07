'use client';

import { create } from 'zustand';

type Theme = 'light' | 'dark';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',

  setTheme: (theme) => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },

  toggleTheme: () => {
    const current = get().theme;
    const next = current === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);

    set({ theme: next });
  },

  initTheme: () => {
    if (typeof window === 'undefined') return;

    const saved = localStorage.getItem('theme') as Theme | null;

    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      set({ theme: saved });
      return;
    }

    const systemDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const theme = systemDark ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
    set({ theme });
  },
}));
