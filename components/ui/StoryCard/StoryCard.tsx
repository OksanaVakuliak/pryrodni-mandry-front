import Image from 'next/image';
import { Story } from '@/types/Stories';
import { Icon } from '../Icon/Icon';
import Link from 'next/link';
import buttonCss from '../Button/Button.module.css';
import css from './StoryCard.module.css';
import { PageTitle } from '../PageTitle/PageTitle';

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
        <PageTitle tag="h3" className={css.title}>{story.title}</PageTitle>
        <div className={css.footer}>
          <Link href={`/stories/${story._id}`} className={`${buttonCss.button} ${buttonCss.secondary} ${css.viewButton}`}>
            Переглянути статтю
          </Link>
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
