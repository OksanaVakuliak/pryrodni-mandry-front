'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Story } from '@/types/Stories';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import StoryCard from '@/components/ui/StoryCard/StoryCard';
import { Loader } from '@/components/ui/Loader/Loader';
import instance from '@/lib/api/api';
import css from './RecommendedStories.module.css';

interface RecommendedStoriesProps {
  currentStoryId: string;
  categoryId?: string;
}

type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (): Breakpoint => {
  if (window.innerWidth >= 1440) return 'desktop';
  if (window.innerWidth >= 768) return 'tablet';
  return 'mobile';
};

const LIMIT_MAP: Record<Breakpoint, number> = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
};

const fetchRecommended = async (
  storyId: string,
  categoryId: string | undefined,
  limit: number,
): Promise<Story[]> => {
  const { data } = await instance.get<Story[]>('/stories/recommended', {
    params: {
      storyId,
      ...(categoryId ? { categoryId } : {}),
      limit,
    },
  });
  return data;
};

export const RecommendedStories = ({
  currentStoryId,
  categoryId,
}: RecommendedStoriesProps) => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const limit = LIMIT_MAP[breakpoint];

  const {
    data: stories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recommended', currentStoryId, categoryId, limit],
    queryFn: () => fetchRecommended(currentStoryId, categoryId, limit),
  });

  if (isLoading) {
    return (
      <section className={css.section}>
        <PageTitle tag="h2" className={css.sectionTitle}>
          Вам також сподобається
        </PageTitle>
        <Loader />
      </section>
    );
  }

  if (isError) {
    return (
      <section className={css.section}>
        <PageTitle tag="h2" className={css.sectionTitle}>
          Вам також сподобається
        </PageTitle>
        <p>Не вдалося завантажити рекомендовані історії.</p>
      </section>
    );
  }

  return (
    <section className={css.section}>
      <PageTitle tag="h2" className={css.sectionTitle}>
        Вам також сподобається
      </PageTitle>

      <div className={css.grid}>
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            sizes="(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw"
            priority={true}
          />
        ))}
      </div>
    </section>
  );
};
