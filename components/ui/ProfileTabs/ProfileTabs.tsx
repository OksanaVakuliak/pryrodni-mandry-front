'use client';

import { usePathname } from 'next/navigation';
import styles from './ProfileTabs.module.css';
import { CustomLink } from '@/components/ui/Link/Link';

export default function ProfileTabs() {
  const pathname = usePathname();
  const isMyStoriesActive = pathname === '/profile/my';

  return (
    <nav className={styles.tabs} aria-label="Фільтр історій профілю">
      <CustomLink
        className={`${styles.tab} ${!isMyStoriesActive ? styles.active : ''}`}
        href="/profile"
        variant="textWithBorder"
      >
        Збережені історії
      </CustomLink>
      <CustomLink
        className={`${styles.tab} ${isMyStoriesActive ? styles.active : ''}`}
        href="/profile/my"
        variant="textWithBorder"
      >
        Мої історії
      </CustomLink>
    </nav>
  );
}
