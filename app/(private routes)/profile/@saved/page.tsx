import SavedStoriesClient from './SavedStoriesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Збережені історії',
  description:
    'Колекція збережених історій подорожей, пригод та відкриттів у спільноті Природні мандри.',

  openGraph: {
    title: 'Збережені історії — Природні мандри',
    description:
      'Колекція збережених історій подорожей, пригод та відкриттів у спільноті Природні мандри.',
    url: 'https://your-site.com/profile',
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

export default function MySavedStoriesPage() {
  return <SavedStoriesClient />;
}
