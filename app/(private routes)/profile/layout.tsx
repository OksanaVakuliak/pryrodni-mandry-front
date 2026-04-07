'use client';
import { ReactNode } from 'react';
import css from './ProfileLayout.module.css';
import { usePathname } from 'next/navigation';
import { Metadata } from 'next';

interface ProfileLayoutProps {
  children: ReactNode;
  saved: ReactNode;
  my: ReactNode;
}

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

export default function ProfileLayout({
  children,
  saved,
  my,
}: ProfileLayoutProps) {
  const pathname = usePathname();

  const isMyStories = pathname === '/profile/my';

  return (
    <main className={css.layoutContainer}>
      <div className={css.innerWrapper}>
        <section className={css.userInfoSection}>{children}</section>
        <section className={css.storiesSection}>
          {isMyStories ? my : saved}
        </section>
      </div>
    </main>
  );
}
