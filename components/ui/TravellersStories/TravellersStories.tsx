import StoryCard from '../StoryCard/StoryCard';
import { StoryCardSkeleton } from '../StoryCard/StoryCardSkeleton';
import MessageNoStories from '../MessageNoStories/MessageNoStories';
import styles from './TravellersStories.module.css';
import { Story } from '@/types/story';

type Variant = 'noStories' | 'noSaved' | 'noOwn';

type Props = {
  stories: Story[];
  variant: Variant;
  isLoading?: boolean;
  skeletonCount?: number;
};

export default function TravellersStories({
  stories,
  variant,
  isLoading = false,
  skeletonCount = 6,
}: Props) {
  if (isLoading) {
    return (
      <div className={styles.grid}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <StoryCardSkeleton key={`traveller-stories-skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (!stories.length) {
    return <MessageNoStories variant={variant} />;
  }

  return (
    <div className={styles.grid}>
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </div>
  );
}
