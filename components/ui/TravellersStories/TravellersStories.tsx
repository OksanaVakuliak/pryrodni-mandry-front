import StoryCard from '../StoryCard/StoryCard';
import MessageNoStories from '../MessageNoStories/MessageNoStories';
import styles from './TravellersStories.module.css';

type Story = {
  _id: string;
  title: string;
  img: string;
  author: string;
  createdAt: string;
};

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
        <StoryCard
          key={story._id}
          title={story.title}
          img={story.img}
          author={story.author}
          createdAt={story.createdAt}
        />
      ))}
    </div>
  );
}
