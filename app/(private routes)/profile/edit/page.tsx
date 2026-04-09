import type { Metadata } from 'next';
import EditProfileContainer from '@/components/ProfilePage/EditProfileContainer/EditProfileContainer';

export const metadata: Metadata = {
  title: 'Налаштування профілю',
  description:
    'Керуйте своїми особистими даними, змінюйте аватар та оновлюйте пароль у спільноті Природні мандри.',

  openGraph: {
    title: 'Налаштування профілю — Природні мандри',
    description:
      'Керуйте своїми особистими даними, змінюйте аватар та оновлюйте пароль у спільноті Природні мандри.',
    url: 'https://pryrodni-mandry-front.vercel.app/profile/edit',
    siteName: 'Природні мандри',
    images: [
      {
        url: '/Image/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Природні мандри — редагування профілю',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },

  robots: {
    index: false,
    follow: false,
  },
};

export default function EditProfilePage() {
  return <EditProfileContainer />;
}
