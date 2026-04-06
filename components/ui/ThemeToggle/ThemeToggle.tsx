'use client';

import { useThemeStore } from '@/lib/store/useThemeStore';
import styles from './ThemeToggle.module.css';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className={`${styles.toggle} ${theme === 'dark' ? styles.dark : ''}`}
    >
      <div className={styles.sky}></div>

      <div className={styles.sun}></div>
      <div className={styles.moon}></div>

      <div className={styles.tree}></div>
    </button>
  );
};
