'use client';

import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getProfileSavedStories } from '@/lib/api/clientApi';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { useStoriesStore } from '@/lib/store/useStoriesStore';

const PER_PAGE = 6;

export default function SavedStoriesClient() {
  const savedStories = useStoriesStore((s) => s.savedStories);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['profile-saved-stories'],
      queryFn: ({ pageParam = 1 }) =>
        getProfileSavedStories(pageParam, PER_PAGE),
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  const allStories = useMemo(() => {
    const stories = data?.pages.flatMap((page) => page.stories) || [];
    return stories.filter((story) => savedStories[story._id] !== false);
  }, [data, savedStories]);

  if (isLoading)
    return <TravellersStories stories={[]} variant="noSaved" isLoading />;

  return (
    <>
      <TravellersStories stories={allStories} variant="noSaved" />

      <Pagination
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        isVisible={!!hasNextPage}
      />
    </>
  );
}
