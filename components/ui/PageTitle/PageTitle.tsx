import React from 'react';
import css from './PageTitle.module.css';

interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: PageTitleProps) => {
  return <h1 className={css.title}>{children}</h1>;
};
