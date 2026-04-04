'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Grid, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getTravellers } from '@/lib/api/clientApi';
import { Icon } from '@/components/ui/Icon/Icon';
import { Button } from '@/components/ui/Button/Button';
import { Loader } from '@/components/ui/Loader/Loader';
import { CustomLink } from '@/components/ui/Link/Link';

import 'swiper/css';
import 'swiper/css/grid';
import css from './OurTravellers.module.css';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import TravellerCard from '@/components/ui/TravallerCard/TravallerCard';

const OurTravellers = () => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const {
    data: travellers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['travellers'],
    queryFn: () => getTravellers(),
  });

  useEffect(() => {
    if (isError) {
      toast.error('Не вдалося завантажити мандрівників');
    }
  }, [isError]);

  if (isLoading) return <Loader />;

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.header}>
          <PageTitle className={css.title}>Наші Мандрівники</PageTitle>
          <CustomLink
            href="/travellers"
            variant="primary"
            className={css.allLink}
          >
            Всі мандрівники
          </CustomLink>
        </div>

        <div className={css.sliderWrapper}>
          <Swiper
            modules={[Navigation, Autoplay, Grid]}
            spaceBetween={20}
            loop={false}
            navigation={{
              prevEl: `.${css.prevBtn}`,
              nextEl: `.${css.nextBtn}`,
            }}
            onSwiper={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                grid: {
                  rows: 3,
                  fill: 'row',
                },
              },
              768: {
                slidesPerView: 2,
                grid: {
                  rows: 2,
                  fill: 'row',
                },
              },
              1440: {
                slidesPerView: 4,
                grid: {
                  rows: 1,
                },
              },
            }}
            className={css.swiper}
          >
            {travellers?.map((traveller) => (
              <SwiperSlide key={traveller._id} className={css.swiperSlide}>
                <TravellerCard traveller={traveller} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.controls}>
            <Button
              className={`${css.navButton} ${css.prevBtn}`}
              aria-label="Попередні"
              variant="secondary"
              disabled={isBeginning}
            >
              <Icon name={'icon-strelka_left'} className={css.icon} />
            </Button>
            <Button
              className={`${css.navButton} ${css.nextBtn}`}
              aria-label="Наступні"
              variant="secondary"
              disabled={isEnd}
            >
              <Icon name={'icon-strelka_right'} className={css.icon} />
            </Button>
          </div>
        </div>

        <CustomLink
          href="/travellers"
          variant="primary"
          className={css.mobileAllLink}
        >
          Всі мандрівники
        </CustomLink>
      </div>
    </section>
  );
};

export default OurTravellers;
