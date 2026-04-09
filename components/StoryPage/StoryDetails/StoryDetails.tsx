'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Icon } from '@/components/ui/Icon/Icon';
import instance from '@/lib/api/api';
import { toast } from 'react-hot-toast';
import { RecommendedStories } from '../RecomendedStories/RecommendedStories';
import css from './StoryDetails.module.css';
import { SaveStoryButton } from '@/components/ui/SaveStoryButton.tsx/SaveStoryButton';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useStoriesStore } from '@/lib/store/useStoriesStore';
import {
  Skeleton,
  SkeletonCard,
  SkeletonPageTitle,
} from '@/components/ui/Skeleton/Skeleton';
import { Story } from '@/types/story';

interface StoryPageProps {
  storyId: string;
}

const getStoryById = async (id: string): Promise<Story> => {
  const { data } = await instance.get<Story>(`/stories/${id}`);
  return data;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatArticle = (text: string): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]+[\s]*/g) ?? [text];
  const groups: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) {
    groups.push(
      sentences
        .slice(i, i + 3)
        .join('')
        .trim(),
    );
  }
  return groups;
};

export const StoryDetails = ({ storyId }: StoryPageProps) => {
  const hasShownErrorRef = useRef(false);

  const {
    data: story,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => getStoryById(storyId),
  });

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const initialIsSaved = useStoriesStore(
    (s) => s.savedStories[storyId] ?? false,
  );

  useEffect(() => {
    if ((isError || (!isLoading && !story)) && !hasShownErrorRef.current) {
      toast.error('Не вдалося завантажити деталі історії. Спробуйте пізніше.');
      hasShownErrorRef.current = true;
    }
  }, [isError, isLoading, story]);

  if (isLoading) {
    return (
      <section className={css.pageWrapper}>
        <div className="container">
          <div className={css.article}>
            <div className={css.header}>
              <div className={css.heroImageWrapper}>
                <Skeleton
                  variant="image"
                  className={css.heroImage}
                  width="100%"
                  height="100%"
                />
              </div>

              <div className={css.headerContent}>
                <Skeleton
                  variant="text"
                  width={140}
                  height={28}
                  className={css.backLink}
                />
                <SkeletonPageTitle tag="h1" className={css.title} />

                <div className={css.meta}>
                  <Skeleton variant="text" width="72%" />
                  <Skeleton variant="text" width="64%" />
                  <Skeleton variant="text" width="56%" />
                </div>
              </div>
            </div>

            <div className={css.contentBox}>
              <div className={css.content}>
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={`story-content-skeleton-${idx}`}
                    lines={3}
                    width="100%"
                    className={css.articleText}
                  />
                ))}
              </div>

              <div className={css.saveSection}>
                <div className={css.saveSectionInner}>
                  <SkeletonPageTitle
                    tag="h3"
                    className={css.saveTitle}
                    width={280}
                  />
                  <Skeleton lines={2} width="100%" />
                  <Skeleton
                    variant="button"
                    width={220}
                    className={css.saveButton}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={css.recommendedBox}>
            <Skeleton variant="title" width={280} height={36} />
            <div className={css.content}>
              {Array.from({ length: 3 }).map((_, idx) => (
                <SkeletonCard key={`recommended-story-skeleton-${idx}`} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !story) {
    return null;
  }

  return (
    <section className={css.pageWrapper}>
      <div className="container">
        <div className={css.article}>
          <div className={css.header}>
            <div className={css.heroImageWrapper}>
              {story?.img && (
                <Image
                  priority
                  src={story.img}
                  alt={story.title || ''}
                  fill
                  className={css.heroImage}
                  sizes="(max-width: 767px) 100vw, (max-width: 1439px) 100vw, 700px"
                />
              )}
            </div>

            <div className={css.headerContent}>
              <Link href="/stories" className={css.backLink}>
                <Icon
                  name="icon-chevron_left"
                  width={24}
                  height={24}
                  className={css.backIcon}
                />
                Всі статті
              </Link>
              <PageTitle tag="h1" className={css.title}>
                {story?.title}
              </PageTitle>

              <div className={css.meta}>
                <p className={css.metaItem}>
                  <span className={css.metaLabel}>Автор статті</span>{' '}
                  {story?.ownerId?.name}
                </p>
                <p className={css.metaItem}>
                  <span className={css.metaLabel}>Опубліковано</span>{' '}
                  {formatDate(story?.date || '')}
                </p>
                <p className={css.metaItem}>
                  <span className={css.metaLabel}>Маршрути</span>
                </p>
              </div>
            </div>
          </div>
          <div className={css.contentBox}>
            <div className={css.content}>
              {formatArticle(story?.article || '').map((paragraph, idx) => (
                <p key={idx} className={css.articleText}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className={css.saveSection}>
              <div className={css.saveSectionInner}>
                <PageTitle tag="h3" className={css.saveTitle}>
                  Збережіть собі історію
                </PageTitle>
                <p className={css.saveSubtitle}>
                  Вона буде доступна у вашому профілі у розділі «Збережено»
                </p>
                <SaveStoryButton
                  storyId={story._id}
                  initialIsSaved={initialIsSaved}
                  isAuthenticated={isAuthenticated}
                  variant="text"
                  className={css.saveButton}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={css.recommendedBox}>
          <RecommendedStories
            currentStoryId={storyId}
            categoryId={story?.category?._id}
          />
        </div>
      </div>
    </section>
  );
};
