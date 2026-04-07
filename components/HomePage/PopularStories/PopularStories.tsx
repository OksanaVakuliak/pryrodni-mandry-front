'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import { getPopularStories } from '@/lib/api/clientApi';
import StoryCard from '@/components/ui/StoryCard/StoryCard';
import { Loader } from '@/components/ui/Loader/Loader';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { CustomLink } from '@/components/ui/Link/Link';
import { Skeleton, SkeletonButton } from '@/components/ui/Skeleton/Skeleton';
import { StoryCardSkeleton } from '@/components/ui/StoryCard/StoryCardSkeleton';
import css from './PopularStories.module.css';

export default function PopularStories() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const {
    data: stories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['popular-stories'],
    queryFn: () => getPopularStories(),
  });

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити статті');
    }
  }, [isError]);
  if (isLoading)
    return (
      <section className={`${css.popularStories} container`}>
        <div className={css.header}>
          <Skeleton variant="title" width={260} />
          <div className={css.linkWrapperDesktop}>
            <SkeletonButton />
          </div>
        </div>

        <div className={css.skeletonGrid}>
          {Array.from({ length: 3 }).map((_, index) => (
            <StoryCardSkeleton key={`popular-skeleton-${index}`} />
          ))}
        </div>

        <div className={css.linkWrapperMobile}>
          <SkeletonButton width="100%" />
        </div>

        <Loader />
      </section>
    );

  return (
    <section className={`${css.popularStories} container`}>
      <div className={css.header}>
        <PageTitle tag="h2">Популярні статті</PageTitle>

        <div className={css.linkWrapperDesktop}>
          <CustomLink href="/stories" variant="primary" className={css.link}>
            Всі статті
          </CustomLink>
        </div>
      </div>

      {stories && (
        <div className={css.sliderWrapper}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: `.${css.navNext}`,
              prevEl: `.${css.navPrev}`,
            }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {stories?.slice(0, 10).map((story) => (
              <SwiperSlide key={story._id} className={css.slide}>
                <StoryCard story={story} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.navButtons}>
            <Button
              disabled={isBeginning}
              className={`${css.navButton} ${css.navPrev}`}
              variant="secondary"
            >
              <Icon name="icon-strelka_left" className={css.icon} />
            </Button>

            <Button
              disabled={isEnd}
              className={`${css.navButton} ${css.navNext}`}
              variant="secondary"
            >
              <Icon name="icon-strelka_right" className={css.icon} />
            </Button>
          </div>
        </div>
      )}
      <div className={css.linkWrapperMobile}>
        <CustomLink href="/stories" variant="primary" className={css.link}>
          Всі статті
        </CustomLink>
      </div>
    </section>
  );
}
