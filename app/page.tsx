// import type { Metadata } from 'next';
// import About from '@/components/HomePage/About/about';
// import Hero from '@/components/HomePage/Hero/hero';
// import Join from '@/components/HomePage/Join/join';
// import PopularStories from '@/components/HomePage/PopularStories/PopularStories';
// import OurTravellers from '@/components/HomePage/OurTravellers/OurTravellers';

// export const metadata: Metadata = {
//   title: 'Головна',
//   description: 'Еко-мандрівки Україною та спільнота свідомих мандрівників',

//   openGraph: {
//     title: 'Головна',
//     description: 'Еко-мандрівки Україною та спільнота свідомих мандрівників',
//     url: 'https://your-site.com',
//     siteName: 'Природні мандри',
//     images: [
//       {
//         url: '/Image/Hero.webp',
//         width: 1200,
//         height: 630,
//       },
//     ],
//     locale: 'uk_UA',
//     type: 'website',
//   },
// };

// const HomePage = () => {
//   return (
//     <>
//       <Hero />
//       <PopularStories />
//       <About />
//       <OurTravellers />
//       <Join />
//     </>
//   );
// };

// export default HomePage;

import Image from 'next/image';
import { Icon } from '@/components/ui/Icon/Icon';
import { Button } from '@/components/ui/Button/Button';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import styles from '@/components/ui/StoryCard/StoryCard.module.css';

type Props = {
  title: string;
  img: string;
  author: string;
  createdAt: string;
  onOpen?: () => void;
  onSave?: () => void;
};

export default function StoryCard({
  title,
  img,
  author,
  createdAt,
  onOpen,
  onSave,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={img} alt={title} fill className={styles.image} />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {author} • {createdAt}
          <Icon
            name="icon-bookmark"
            width={16}
            height={16}
            className={styles.svg}
          ></Icon>
        </p>

        <PageTitle className={styles.title}>{title}</PageTitle>

        <div className={styles.actions}>
          <Button onClick={onOpen} className={styles.button}>
            Переглянути статтю
          </Button>

          <Button onClick={onSave} className={styles.iconBtn}>
            <Icon name="icon-bookmark"></Icon>
          </Button>
        </div>
      </div>
    </div>
  );
}
