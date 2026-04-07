import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';
import StoriesErrorClient from '@/components/Errors/StoriesErrorClient';
import { getServerProfileMyStories } from '@/lib/api/serverApi';
import { Story } from '@/types/story';
import type { Metadata } from 'next';
import { isAxiosError } from 'axios';

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

export default async function MyStoriesPage() {
  let stories: Story[] = [];
  let errorMessage: string | null = null;

  try {
    const response = await getServerProfileMyStories(1, 6);

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
