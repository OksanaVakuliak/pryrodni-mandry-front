import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

export const Skeleton = ({ width, height, className }: SkeletonProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className || ''}`}
      style={{ width, height }}
    />
  );
};