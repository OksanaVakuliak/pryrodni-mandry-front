import {
  Skeleton,
  SkeletonImage,
  SkeletonPageTitle,
  SkeletonButton,
} from '@/components/ui/Skeleton/Skeleton';
import styles from './StoryCard.module.css';

export function StoryCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <SkeletonImage height="100%" style={{ borderRadius: 0 }} />
      </div>

      <div className={styles.content}>
        <Skeleton variant="text" width={140} />
        <SkeletonPageTitle tag="h3" />
        <div className={styles.actions}>
          <SkeletonButton width="100%" />
        </div>
      </div>
    </div>
  );
}
