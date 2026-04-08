'use client';

import { useAuthStore } from '@/lib/store/useAuthStore';
import { useStoriesStore } from '@/lib/store/useStoriesStore';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon/Icon';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Story } from '@/types/story';
import { CustomLink } from '../Link/Link';
import { SaveStoryButton } from '../SaveStoryButton.tsx/SaveStoryButton';
import styles from '@/components/ui/StoryCard/StoryCard.module.css';
import { useEffect } from 'react';

type Props = {
  story: Story;
};

export default function StoryCard({ story }: Props) {
  const { title, img, ownerId } = story;

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const initialIsSaved = useStoriesStore(
    (s) => s.savedStories[story._id] ?? false,
  );

  const storyRateFromStore = useStoriesStore((s) => s.storiesRate[story._id]);

  const rate = storyRateFromStore ?? story.rate;

  const initStoryRate = useStoriesStore((s) => s.initStoryRate);

  useEffect(() => {
    if (storyRateFromStore === undefined) {
      initStoryRate(story._id, story.rate);
    }
  }, [story._id, story.rate, storyRateFromStore, initStoryRate]);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={img} alt={title} fill className={styles.image} />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {ownerId.name}
          <span className={styles.metaSeparator}>·</span>
          {rate}
          <Icon
            name="icon-bookmark"
            width={16}
            height={16}
            className={styles.svg}
          />
        </p>

        <PageTitle className={styles.title} tag="h3">
          {title}
        </PageTitle>

        <div className={styles.actions}>
          <CustomLink
            href={`/stories/${story._id}`}
            variant="secondary"
            className={styles.infoBtn}
          >
            Переглянути статтю
          </CustomLink>

          <SaveStoryButton
            storyId={story._id}
            initialIsSaved={initialIsSaved}
            isAuthenticated={isAuthenticated}
            variant="icon"
            className={styles.iconBtn}
          />
        </div>
      </div>
    </div>
  );
}
