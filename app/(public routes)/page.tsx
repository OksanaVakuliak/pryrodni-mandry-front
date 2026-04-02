import type { Metadata } from 'next';
import About from '@/components/HomePage/About/about';
import Hero from '@/components/HomePage/Hero/hero';
import Join from '@/components/HomePage/Join/join';
import PopularStories from '@/components/HomePage/PopularStories/PopularStories';
import OurTravellers from '@/components/HomePage/OurTravellers/OurTravellers';


export const metadata: Metadata = {
  title: 'Головна',
  description: 'Еко-мандрівки Україною та спільнота свідомих мандрівників',

  openGraph: {
    title: 'Головна',
    description: 'Еко-мандрівки Україною та спільнота свідомих мандрівників',
    url: 'https://your-site.com',
    siteName: 'Природні мандри',
    images: [
      {
        url: '/Image/Hero.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <PopularStories />
      <About />
      <OurTravellers />
      <Join />
    </>
  );
};

export default HomePage;
