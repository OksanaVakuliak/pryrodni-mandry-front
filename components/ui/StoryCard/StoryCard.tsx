import Image from 'next/image';
import { Story } from '@/types/Stories';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import css from './StoryCard.module.css';

interface StoryCardProps {
  story: Story;
}

export const StoryCard = ({ story }: StoryCardProps) => {
  const authorName = story.ownerId.name;

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          loading="lazy"
          placeholder="blur"
          blurDataURL={story.img}
          src={story.img}
          alt={story.title}
          fill
          className={css.image}
          sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw"
        />
      </div>
      <div className={css.content}>
        <div className={css.info}>
          <span className={css.author}>{authorName}</span>
          <span className={css.dot}>•</span>
          <span className={css.savedCount}>
            {story.rate}
            <Icon
              name="icon-bookmark"
              width={14}
              height={14}
              className={css.smallBookmarkIcon}
            />
          </span>
        </div>
        <h3 className={css.title}>{story.title}</h3>
        <div className={css.footer}>
          <Button variant="secondary" className={css.viewButton} href={`/stories/${story._id}`}>
            Переглянути статтю
          </Button>
          <button className={css.bookmarkButton} aria-label="Add to bookmarks">
            <Icon
              name="icon-bookmark"
              width={24}
              height={24}
              className={css.bookmarkIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
