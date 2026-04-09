'use client';

import { useThemeStore } from '@/lib/store/useThemeStore';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      }}
      className={`${styles.toggle} ${theme === 'dark' ? styles.dark : ''}`}
      aria-label={
        theme === 'dark' ? 'Перейти на світлу тему' : 'Перейти на темну тему'
      }
    >
      <div className={styles.sky}></div>

      <div className={styles.sun}></div>
      <div className={styles.moon}></div>

      <div className={styles.tree}></div>
    </button>
  );
};
