import MyStoriesClient from './MyStoriesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мої історії',
  description:
    'Ваша колекція історій подорожей, пригод та відкриттів у спільноті Природні мандри.',

  openGraph: {
    title: 'Мої історії — Природні мандри',
    description:
      'Ваша колекція історій подорожей, пригод та відкриттів у спільноті Природні мандри.',
    url: 'https://your-site.com/profile/my-stories',
    siteName: 'Природні мандри',
    images: [
      {
        url: '/Image/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Природні мандри — створення історії',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function MyStoriesPage() {
  return <MyStoriesClient />;
}
