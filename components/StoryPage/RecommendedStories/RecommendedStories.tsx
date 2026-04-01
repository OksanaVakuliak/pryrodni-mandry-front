'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { Story } from '@/types/Stories';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Icon } from '@/components/ui/Icon/Icon';
import instance from '@/lib/api/api';
import css from './RecommendedStories.module.css';

interface RecommendedStoriesProps {
  currentStoryId: string;
}

const fetchRecommended = async (storyId: string): Promise<Story[]> => {
  const { data } = await instance.get<Story[]>('/stories/recommended', {
    params: { storyId },
  });
  return data;
};

export const RecommendedStories = ({ currentStoryId }: RecommendedStoriesProps) => {
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['recommended', currentStoryId],
    queryFn: () => fetchRecommended(currentStoryId),
  });

  if (isLoading) {
    return (
      <section className={css.section}>
        <PageTitle tag="h2" className={css.sectionTitle}>
          Вам також сподобається
        </PageTitle>
        <div className={css.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={css.skeletonCard}>
              <div className={css.skeletonImage} />
              <div className={css.skeletonContent}>
                <div className={css.skeletonMeta} />
                <div className={css.skeletonTitle} />
                <div className={css.skeletonButton} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!stories.length) return null;

  return (
    <section className={css.section}>
      <PageTitle tag="h2" className={css.sectionTitle}>
        Вам також сподобається
      </PageTitle>

      <div className={css.grid}>
        {stories.map((story) => (
          <article key={story._id} className={css.card}>
            <div className={css.imageWrapper}>
              <Image
                src={story.img}
                alt={story.title}
                fill
                className={css.image}
                sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw"
                loading="lazy"
              />
            </div>

            <div className={css.cardContent}>
              <div className={css.cardMeta}>
                <span className={css.author}>{story.ownerId.name}</span>
                <span className={css.dot}>•</span>
                <span className={css.rate}>
                  {story.rate}
                  <Icon name="icon-bookmark" width={13} height={13} className={css.rateIcon} />
                </span>
              </div>

              <PageTitle tag="h3" className={css.cardTitle}>
                {story.title}
              </PageTitle>

              <div className={css.cardFooter}>
                <Link href={`/stories/${story._id}`} className={css.viewButton}>
                  Переглянути статтю
                </Link>
                <button className={css.bookmarkButton} aria-label="Зберегти">
                  <Icon name="icon-bookmark" width={22} height={22} className={css.bookmarkIcon} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
