'use client';
import { useState, useEffect, useRef } from 'react';
import { getTravellers } from '@/lib/api/clientApi';
import { Traveller } from '@/types/traveller';
import TravellerCard from '@/components/ui/TravallerCard/TravallerCard';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import styles from './TravellersList.module.css';
import { Loader } from '@/components/ui/Loader/Loader';
import { Pagination } from '@/components/ui/Pagination/Pagination';
import { TravellerCardSkeleton } from '@/components/ui/TravallerCard/TravellerCardSkeleton';
import { SkeletonPageTitle } from '@/components/ui/Skeleton/Skeleton';

const TravellersList = () => {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  const PER_PAGE = 12;

  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const remainingItems = totalItems - travellers.length;
  const skeletonsToShow = Math.min(remainingItems, PER_PAGE);

  const loadData = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const response = await getTravellers(PER_PAGE, currentPage);

      setTotalItems(response.totalItems);
      setHasNextPage(response.hasNextPage);

      const newTravellers = response.users;
      setTravellers((prev) =>
        currentPage === 1 ? newTravellers : [...prev, ...newTravellers],
      );
      if (currentPage > 1) {
        setTimeout(() => {
          scrollAnchorRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            'Помилка при завантаженні списку мандрівників',
        );
      } else {
        toast.error('Непередбачувана помилка. Спробуйте пізніше');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadData(nextPage);
  };

  return (
    <section className={styles.section}>
      {isLoading && travellers.length === 0 ? (
        <SkeletonPageTitle tag="h1" className={styles.title} />
      ) : (
        <h1 className={styles.title}>Мандрівники</h1>
      )}
      {isLoading && travellers.length === 0 && (
        <div className={styles.initialLoadingWrap}>
          <div className={styles.skeletonGrid}>
            {Array.from({ length: PER_PAGE }).map((_, index) => (
              <TravellerCardSkeleton key={`traveller-skeleton-${index}`} />
            ))}
          </div>
          <Loader />
        </div>
      )}
      <div className={styles.grid}>
        {travellers.map((traveller, index) => (
          <div
            key={traveller._id}
            ref={
              index === travellers.length - PER_PAGE ? scrollAnchorRef : null
            }
          >
            <TravellerCard traveller={traveller} compact />
          </div>
        ))}
      </div>
      {isLoading && travellers.length > 0 && (
        <div className={styles.loaderBottomWrapper}>
          <div className={styles.skeletonBottomRow}>
            {Array.from({ length: skeletonsToShow }).map((_, index) => (
              <TravellerCardSkeleton
                key={`traveller-bottom-skeleton-${index}`}
              />
            ))}
          </div>
          <Loader />
        </div>
      )}

      <Pagination
        onClick={handleLoadMore}
        isLoading={isLoading}
        isVisible={hasNextPage}
        className={styles.paginationWrapper}
      />
    </section>
  );
};
export default TravellersList;
