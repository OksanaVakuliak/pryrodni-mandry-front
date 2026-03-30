import React from 'react';
import Image from 'next/image';
import { Story } from '@/types/Stories';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import styles from './StoryCard.module.css';

interface StoryCardProps {
  story: Story;
}

export const StoryCard = ({ story }: StoryCardProps) => {
  const authorName = story.ownerId.name;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={story.img}
          alt={story.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <span className={styles.author}>{authorName}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.date}>{story.date}</span>
        </div>
        <h3 className={styles.title}>{story.title}</h3>
        <div className={styles.footer}>
          <Button variant="secondary" className={styles.viewButton}>
            Переглянути статтю
          </Button>
          <button className={styles.bookmarkButton} aria-label="Add to bookmarks">
            <Icon name="icon-bookmark" width={24} height={24} className={styles.bookmarkIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};
