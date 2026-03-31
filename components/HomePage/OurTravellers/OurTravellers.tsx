'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { getTravellers } from '@/lib/api/clientApi';
import { Icon } from '@/components/ui/Icon/Icon';
import { Button } from '@/components/ui/Button/Button';
import { Loader } from '@/components/ui/Loader/Loader';
import { CustomLink } from '@/components/ui/Link/Link';

import 'swiper/css';
import css from './OurTravellers.module.css';
import { TravellerCard } from '@/components/ui/TravellerCard/TravellerCard';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

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
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
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
              320: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1440: { slidesPerView: 4 },
            }}
            className={css.swiper}
          >
            {travellers?.map((traveller) => (
              <SwiperSlide key={traveller._id}>
                {/* <TravellerCard traveller={traveller} /> */}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className={css.controls}>
            <Button
              className={css.prevBtn}
              aria-label="Попередні"
              variant="secondary"
              disabled={isBeginning}
            >
              <Icon name={'icon-strelka_left'} />
            </Button>
            <Button
              className={css.nextBtn}
              aria-label="Наступні"
              variant="secondary"
              disabled={isEnd}
            >
              <Icon name={'icon-strelka_right'} />
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
