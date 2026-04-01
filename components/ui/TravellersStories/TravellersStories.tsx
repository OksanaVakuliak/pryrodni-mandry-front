import StoryCard from '../StoryCard/StoryCard';
import MessageNoStories from '../MessageNoStories/MessageNoStories';
import styles from './TravellersStories.module.css';
import { Story } from '@/types/story';

type Props = {
  stories: Story[];
};

export default function TravellersStories({ stories }: Props) {
  if (!stories.length) {
    return <MessageNoStories />;
  }

  return (
    <div className={styles.grid}>
      {stories.map((story) => (
        <StoryCard key={story._id} story={story} />
      ))}
    </div>
  );
}
