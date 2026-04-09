import StoriesPage from '@/components/StoriesPage/StoriesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Історії | Природні мандри',
  description:
    'Подорожі та пригоди по всій Україні. Фотографії, маршрути та враження від мандрівників.',
  openGraph: {
    title: 'Історії | Природні мандри',
    description:
      'Подорожі та пригоди по всій Україні. Фотографії, маршрути та враження від мандрівників.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Історії | Природні мандри',
    description:
      'Подорожі та пригоди по всій Україні. Фотографії, маршрути та враження від мандрівників.',
  },
};

export default function Stories() {
  return <StoriesPage />;
}
