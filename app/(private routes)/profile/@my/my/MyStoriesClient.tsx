'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getProfileMyStories } from '@/lib/api/clientApi';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';

const PER_PAGE = 6;

export default function MyStoriesClient() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['profile-my-stories'],
      queryFn: ({ pageParam = 1 }) => getProfileMyStories(pageParam, PER_PAGE),
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  if (isLoading)
    return <TravellersStories stories={[]} variant="noOwn" isLoading />;

  const allStories = data?.pages.flatMap((page) => page.stories) || [];

  return (
    <>
      <TravellersStories stories={allStories} variant="noOwn" />

      <Pagination
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        isVisible={!!hasNextPage}
      />
    </>
  );
}
