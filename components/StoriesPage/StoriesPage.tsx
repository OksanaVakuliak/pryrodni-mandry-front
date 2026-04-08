'use client';
import { StoriesFilters } from '@/types/Stories';
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { toast } from 'react-hot-toast';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { StoriesCategories } from './CategoriesFilter/StoriesCategories';
import { StoriesGrid } from './CategoriesFilter/StoriesGrid';
import { Loader } from '@/components/ui/Loader/Loader';
import {
  SkeletonButton,
  SkeletonPageTitle,
  Skeleton,
} from '@/components/ui/Skeleton/Skeleton';
import { StoryCardSkeleton } from '@/components/ui/StoryCard/StoryCardSkeleton';
import css from './StoriesPage.module.css';
import StoryCard from '../ui/StoryCard/StoryCard';
import { Pagination } from '../ui/Pagination/Pagination';

const StoriesPage = () => {
  const [filters, setFilters] = useState<StoriesFilters>({
    sort: 'rate',
    page: 1,
    perPage: 9,
    category: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      let newPerPage = 9;
      if (window.innerWidth < 1440 && window.innerWidth >= 768) {
        newPerPage = 8;
      } else if (window.innerWidth < 768) {
        newPerPage = 8;
      }

      setFilters((prev) => {
        if (prev.perPage !== newPerPage) {
          return { ...prev, perPage: newPerPage, page: 1 };
        }
        return prev;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const {
    data: stories,
    isLoading: isLoadingStories,
    isError: isErrorStories,
  } = useQuery({
    queryKey: ['stories'],
    queryFn: clientApi.stories.getAll,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: clientApi.categories.getAll,
  });

  const isLoading = isLoadingStories || isLoadingCategories;

  useEffect(() => {
    if (isErrorStories) {
      toast.error('Помилка завантаження статей.');
    }
  }, [isErrorStories]);

  const filteredStories = useMemo(() => {
    if (!stories) return [];
    let result = [...stories];

    if (filters.category) {
      result = result.filter(
        (story) => story.category._id === filters.category,
      );
    }

    if (filters.sort === 'rate') {
      result.sort((a, b) => Number(b.rate || 0) - Number(a.rate || 0));
    }

    return result;
  }, [stories, filters.category, filters.sort]);

  const paginatedStories = useMemo(() => {
    const limit = filters.page * filters.perPage;
    return filteredStories.slice(0, limit);
  }, [filteredStories, filters.page, filters.perPage]);

  const hasMore = paginatedStories.length < filteredStories.length;

  const handleCategoryChange = (categoryId: string | undefined) => {
    setFilters((prev) => ({ ...prev, category: categoryId, page: 1 }));
  };

  const handleShowMore = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    const element = document.getElementById('stories-grid');
    setTimeout(() => {
      element?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }, 100);
  };

  return (
    <section className={css.pageWrapper}>
      <div className="container">
        {isLoading && (
          <>
            <SkeletonPageTitle tag="h1" className={css.title} />
            <div className={css.skeletonFilters}>
              <Skeleton variant="text" height={48} width={'100%'} lines={2} />
            </div>
            <div className={css.skeletonGrid}>
              {Array.from({ length: 9 }).map((_, index) => (
                <StoryCardSkeleton key={`stories-skeleton-${index}`} />
              ))}
            </div>
            <div className={css.skeletonButtonWrap}>
              <SkeletonButton />
            </div>
            <Loader />
          </>
        )}

        {!isLoading && !isErrorStories && (
          <>
            <PageTitle className={css.title}>Статті</PageTitle>
            <StoriesCategories
              categories={categories}
              activeCategory={filters.category}
              onCategoryChange={handleCategoryChange}
            />
            <div className={css.showMoreContainer}>
              <StoriesGrid>
                {paginatedStories.map((story) => (
                  <StoryCard key={story._id} story={story} />
                ))}
              </StoriesGrid>
            </div>

            {hasMore && (
              <div className={css.showMoreButtonContainer}>
                <Pagination
                  onClick={handleShowMore}
                  isLoading={isLoading}
                  isVisible={hasMore}
                  className={css.showMoreButton}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default StoriesPage;
