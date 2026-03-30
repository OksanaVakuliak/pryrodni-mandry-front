'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getPopularStories } from '@/lib/api/clientApi';
import css from './PopularStories.module.css';
import StoryCard from '@/components/ui/StoryCard/StoryCard';

export default function PopularStories() {
  const {
    data: stories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['popular-stories'],
    queryFn: () => getPopularStories(),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading stories</p>;

  return (
    <div className={`${css.popularStories} container`}>
      <div className={css.header}>
        <h2 className={css.title}>Популярні статті</h2>
        <div className={css.linkWrapperDesktop}>
          <Link href="/stories" className={css.link}>
            Всі статті
          </Link>
        </div>
      </div>

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
        >
          {stories?.slice(0, 10).map((story) => (
            <SwiperSlide key={story._id} className={css.slide}>
              <StoryCard story={story} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={css.navButtons}>
          <button className={`${css.navPrev} ${css.navButton}`}>
            <svg className={css.icon} width={24} height={24}>
              <use href="/Icons/sprite.svg#icon-strelka_left" />
            </svg>
          </button>

          <button className={`${css.navNext} ${css.navButton}`}>
            <svg className={css.icon} width={24} height={24}>
              <use href="/Icons/sprite.svg#icon-strelka_right" />
            </svg>
          </button>
        </div>

        <div className={css.linkWrapperMobile}>
          <Link href="/stories" className={css.link}>
            Всі статті
          </Link>
        </div>
      </div>
    </div>
  );
}
