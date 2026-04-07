'use client';

import { useAuthStore } from '@/lib/store/useAuthStore';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import ProfileTabs from '@/components/ui/ProfileTabs/ProfileTabs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Мій профіль',
  description:
    'Ваш профіль з власними та збереженими історіями подорожей, пригод та відкриттів у спільноті Природні мандри.',

  openGraph: {
    title: 'Мій профіль — Природні мандри',
    description:
      'Ваш профіль з власними та збереженими історіями подорожей, пригод та відкриттів у спільноті Природні мандри.',
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

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <>
      <TravellerInfo
        name={user.name}
        avatar={user.avatarUrl}
        storiesCount={user.articlesAmount || 0}
      />
      <ProfileTabs />
    </>
  );
}
