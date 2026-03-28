import styles from './PageTitle.module.css';
import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
  tag?: 'h1' | 'h2';
}

export const PageTitle = ({
  children,
  className = '',
  tag: Tag = 'h1',
}: PageTitleProps) => {
  return <Tag className={`${styles.title} ${className}`}>{children}</Tag>;
};
