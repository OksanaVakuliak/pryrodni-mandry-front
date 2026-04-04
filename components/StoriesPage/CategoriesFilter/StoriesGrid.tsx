import React from 'react';
import css from './StoriesGrid.module.css';

interface StoriesGridProps {
  children: React.ReactNode;
}

export const StoriesGrid = ({ children }: StoriesGridProps) => {
  return <div className={css.grid}>{children}</div>;
};
