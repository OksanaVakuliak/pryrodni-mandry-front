import StoryCard from '../StoryCard/StoryCard';
import MessageNoStories from '../MessageNoStories/MessageNoStories';
import styles from './TravellersStories.module.css';
import { Story } from '@/types/story';

type Variant = 'noStories' | 'noSaved' | 'noOwn';

type Props = {
  stories: Story[];
  variant: Variant;
};

export default function TravellersStories({ stories, variant }: Props) {
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
