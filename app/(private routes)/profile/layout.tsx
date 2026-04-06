'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import css from './ProfileLayout.module.css';

interface ProfileLayoutProps {
  children: ReactNode;
  saved: ReactNode;
  my: ReactNode;
}

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
        {/* ВЕРХНЯ ЧАСТИНА: TravellerInfo + Таби */}
        {/* Вони приходять сюди через пропс {children} з файлу page.tsx */}
        <section className={css.userInfoSection}>{children}</section>

        {/* НИЖНЯ ЧАСТИНА: Список історій */}
        {/* Завдяки Parallel Routes, тут буде завантажуватись або @saved, або @my */}
        <section className={css.storiesSection}>
          {isMyStories ? my : saved}
        </section>
      </div>
    </main>
  );
}
