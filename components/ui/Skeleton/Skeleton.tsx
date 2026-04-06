import css from './Skeleton.module.css';

export const Skeleton = ({ limit = 6 }: { limit?: number }) => (
  <div className={css.grid}>
    {Array.from({ length: limit }).map((_, i) => (
      <div key={i} className={css.skeletonCard}>
        <div className={`${css.skeletonImage} shimmerEffect`} />
        <div className={css.skeletonContent}>
          <div className={`${css.skeletonMeta} shimmerEffect`} />
          <div className={`${css.skeletonTitle} shimmerEffect`} />
          <div className={`${css.skeletonButton} shimmerEffect`} />
        </div>
      </div>
    ))}
  </div>
);
