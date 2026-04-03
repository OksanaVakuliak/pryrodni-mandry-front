'use client';

import { useState, useEffect, useRef } from 'react';
import { getTravellers } from '@/lib/api/clientApi';
import { Traveller } from '@/types/traveller';
import TravellerCard from '@/components/ui/TravallerCard/TravallerCard';
import { toast } from 'react-hot-toast';
import styles from './TravellersList.module.css';
import { Loader } from '@/components/ui/Loader/Loader';
import { Pagination } from '@/components/ui/Pagination/Pagination';

const TravellersList = () => {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const PER_PAGE = 12;
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  const loadData = async (currentPage: number) => {
    setIsLoading(true);
    try {
      const data = await getTravellers(PER_PAGE, currentPage);

      if (data.length < PER_PAGE) {
        setHasNextPage(false);
      }

      setTravellers((prev) => (currentPage === 1 ? data : [...prev, ...data]));
      if (currentPage > 1) {
        setTimeout(() => {
          scrollAnchorRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 100);
      }
    } catch (error) {
      toast.error('Помилка при завантаженні списку мандрівників');
      console.error(error);
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
      <h1 className={styles.title}>Мандрівники</h1>
      {isLoading && travellers.length === 0 && (
        <div className={styles.loaderWrapper}>
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
            <TravellerCard
              traveller={traveller}
              onOpen={() => console.log('Відкриття профілю:', traveller._id)}
            />
          </div>
        ))}
      </div>
      {isLoading && travellers.length > 0 && (
        <div className={styles.loaderBottomWrapper}>
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
