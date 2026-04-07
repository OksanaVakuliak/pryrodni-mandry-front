'use client';
import { ReactNode } from 'react';
import css from './ProfileLayout.module.css';
import { usePathname } from 'next/navigation';

interface ProfileLayoutProps {
  children: ReactNode;
  saved: ReactNode;
  my: ReactNode;
  modal: ReactNode;
}

export default function ProfileLayout({
  children,
  saved,
  my,
  modal,
}: ProfileLayoutProps) {
  const pathname = usePathname();

  const isMyStories = pathname === '/profile/my';

  return (
    <div className={css.layoutContainer}>
      <div className={css.innerWrapper}>
        <section
          className={css.userInfoSection}
          aria-label="Інформація профілю"
        >
          {children}
        </section>
        <section className={css.storiesSection} aria-label="Статті профілю">
          {isMyStories ? my : saved}
        </section>
      </div>

      {modal}
    </div>
  );
}
