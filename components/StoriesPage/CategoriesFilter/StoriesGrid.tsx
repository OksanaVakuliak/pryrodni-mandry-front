import React from 'react';
import styles from './StoriesGrid.module.css';

interface StoriesGridProps {
  children: React.ReactNode;
}

export const StoriesGrid = ({ children }: StoriesGridProps) => {
  return <div className={styles.grid}>{children}</div>;
};
