'use client';
import { ReactNode } from 'react';
import css from './ProfileLayout.module.css';
import { usePathname } from 'next/navigation';

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

  if (pathname.includes('confirm')) {
    return <>{children}</>;
  }

  return (
    <div className={css.layoutContainer}>
      <div className={css.innerWrapper}>
        <section className={css.userInfoSection}>{children}</section>
        <section className={css.storiesSection}>
          {isMyStories ? my : saved}
        </section>
      </div>
    </div>
  );
}
