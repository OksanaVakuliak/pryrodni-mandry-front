'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getTravellerStories } from '@/lib/api/clientApi';
import StoryCard from '@/components/ui/StoryCard/StoryCard';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { Loader } from '@/components/ui/Loader/Loader';
import css from './TravellerStoriesList.module.css';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';

export const TravellerStoriesList = ({
  travellerId,
}: {
  travellerId: string;
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['traveller-stories', travellerId],
      queryFn: ({ pageParam = 1 }) =>
        getTravellerStories(travellerId, pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.page + 1 : undefined,
      initialPageParam: 1,
    });

  if (isLoading) return <Loader />;

  const allStories = data?.pages.flatMap((page) => page.stories) || [];

  if (allStories.length === 0) {
    return <TravellersStories stories={allStories} variant="noStories" />;
  }

  return (
    <>
      <div className={css.grid}>
        {allStories.map(
          (story) => story?._id && <StoryCard key={story._id} story={story} />,
        )}
      </div>

      <Pagination
        onClick={() => fetchNextPage()}
        isLoading={isFetchingNextPage}
        isVisible={hasNextPage}
        className={css.pagination}
      />
    </>
  );
};
