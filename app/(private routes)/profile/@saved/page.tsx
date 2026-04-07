import StoriesErrorClient from '@/components/Errors/StoriesErrorClient';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';
import { getServerProfileSavedStories } from '@/lib/api/serverApi';
import { Story } from '@/types/story';
import { isAxiosError } from 'axios';
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

export default async function MySavedStoriesPage() {
  let stories: Story[] = [];
  let errorMessage: string | null = null;

  try {
    const response = await getServerProfileSavedStories(1, 6);

    if (response && Array.isArray(response.stories)) {
      stories = response.stories;
    } else {
      stories = [];
    }
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      errorMessage =
        (error.response?.data && String(error.response.data)) ||
        error.message ||
        'Помилка сервера при завантаженні історій.';
    } else {
      errorMessage = 'Невідома помилка при завантаженні історій.';
    }
  }

  return (
    <>
      <TravellersStories stories={stories} />
      <StoriesErrorClient error={errorMessage} />
    </>
  );
}
