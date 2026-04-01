'use client';
import { StoriesFilters } from '@/types/Stories';
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/clientApi';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { StoriesCategories } from './CategoriesFilter/StoriesCategories';
import { StoriesGrid } from './CategoriesFilter/StoriesGrid';
import { StoryCard } from '@/components/ui/StoryCard/StoryCard';
import { Button } from '@/components/ui/Button/Button';
import css from './StoriesPage.module.css';

const PER_PAGE = 9;

const StoriesPage = () => {
  const [filters, setFilters] = useState<StoriesFilters>({
    sort: 'rate',
    page: 1,
    perPage: PER_PAGE,
    category: undefined,
  });

  const {
    data: stories,
    isLoading: isLoadingStories,
    isError: isErrorStories,
  } = useQuery({
    queryKey: ['stories'],
    queryFn: clientApi.stories.getAll,
  });

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: clientApi.categories.getAll,
  });

  const isLoading = isLoadingStories || isLoadingCategories;
  const isError = isErrorStories;

  const filteredStories = useMemo(() => {
    if (!stories) return [];
    let result = [...stories];

    if (filters.category) {
      result = result.filter(
        (story) => story.category._id === filters.category,
      );
    }

    result.sort((a, b) => b.rate - a.rate);
    return result;
  }, [stories, filters.category]);

  const paginatedStories = useMemo(() => {
    const limit = filters.page * PER_PAGE;
    return filteredStories.slice(0, limit);
  }, [filteredStories, filters.page]);

  const hasMore = paginatedStories.length < filteredStories.length;

  const handleCategoryChange = (categoryId: string | undefined) => {
    setFilters((prev) => ({ ...prev, category: categoryId, page: 1 }));
  };

  const handleShowMore = () => {
    setFilters((prev) => ({ ...prev, page: prev.page + 1 }));
    const element = document.getElementById('stories-grid');
    setTimeout(() => {
      element?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }, 100);
  };

  return (
    <div className={css.pageWrapper}>
      <div className="container">
        <PageTitle>Статті</PageTitle>

        {isLoading && <p>Завантаження...</p>}
        {isError && <p>Помилка завантаження статей.</p>}

        {!isLoading && !isError && (
          <>
            <StoriesCategories
              categories={categories}
              activeCategory={filters.category}
              onCategoryChange={handleCategoryChange}
            />

            <StoriesGrid>
              {paginatedStories.map((story) => (
                <StoryCard key={story._id} story={story} />
              ))}
            </StoriesGrid>

            {hasMore && (
              <div className={css.showMoreContainer}>
                <Button
                  variant="primary"
                  onClick={handleShowMore}
                  className={css.showMoreButton}
                >
                  Показати ще
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
