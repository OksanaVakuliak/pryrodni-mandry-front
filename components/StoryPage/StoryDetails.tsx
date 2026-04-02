'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { Story } from '@/types/Stories';
import instance from '@/lib/api/api';
import { RecommendedStories } from './RecomendedStories/RecommendedStories';
import css from './StoryDetails.module.css';

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
  const {
    data: story,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['story', storyId],
    queryFn: () => getStoryById(storyId),
  });

  if (isLoading) {
    return (
      <div className={css.pageWrapper}>
        <div className="container">
          <div className={css.skeleton}>
            <div className={css.skeletonTitle} />
            <div className={css.skeletonMeta} />
            <div className={css.skeletonImage} />
            <div className={css.skeletonText} />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !story) {
    return (
      <div className={css.pageWrapper}>
        <div className="container">
          <p className={css.error}>Не вдалося завантажити статтю.</p>
        </div>
      </div>
    );
  }

  return (
    <section className={css.pageWrapper}>
      <div className="container">
        <div className={css.article}>
          <div className={css.header}>
            <div className={css.heroImageWrapper}>
              <Image
                src={story.img}
                alt={story.title}
                fill
                className={css.heroImage}
                sizes="(max-width: 767px) 100vw, (max-width: 1439px) 100vw, 700px"
                priority
              />
            </div>

            <div className={css.headerContent}>
              <Link href="/stories" className={css.backLink}>
                <Icon
                  name="icon-strelka_left"
                  width={16}
                  height={16}
                  className={css.backIcon}
                />
                Всі статті
              </Link>
              <PageTitle tag="h1" className={css.title}>
                {story.title}
              </PageTitle>

              <div className={css.meta}>
                <p className={css.metaItem}>
                  <span className={css.metaLabel}>Автор статті</span>{' '}
                  {story.ownerId.name}
                </p>
                <p className={css.metaItem}>
                  <span className={css.metaLabel}>Опубліковано</span>{' '}
                  {formatDate(story.date)}
                </p>
                <p className={css.metaItem}>
                  <span className={css.metaLabel}>Маршрути</span>
                </p>
              </div>
            </div>
          </div>
          <div className={css.contentBox}>
            <div className={css.content}>
              {formatArticle(story.article).map((paragraph, idx) => (
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
                <Button variant="primary" className={css.saveButton}>
                  Зберегти
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={css.recommendedBox}>
          <RecommendedStories currentStoryId={storyId} />
        </div>
      </div>
    </section>
  );
};
