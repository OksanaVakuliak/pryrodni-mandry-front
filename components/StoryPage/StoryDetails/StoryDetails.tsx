'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Icon } from '@/components/ui/Icon/Icon';
import { Story } from '@/types/Stories';
import instance from '@/lib/api/api';
import { Loader } from '@/components/ui/Loader/Loader';
import { RecommendedStories } from '../RecomendedStories/RecommendedStories';
import css from './StoryDetails.module.css';
import { SaveStoryButton } from '@/components/ui/SaveStoryButton.tsx/SaveStoryButton';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useStoriesStore } from '@/lib/store/useStoriesStore';

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

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const initialIsSaved = useStoriesStore(
    (s) => s.savedStories[storyId] ?? false,
  );

  if (isLoading) {
    return (
      <section className={css.pageWrapper}>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  if (isError || !story) {
    return (
      <section className={css.pageWrapper}>
        <div className="container">
          <PageTitle className={css.title}>Помилка</PageTitle>
          <p>Не вдалося завантажити деталі історії. Спробуйте пізніше.</p>
        </div>
      </section>
    );
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
