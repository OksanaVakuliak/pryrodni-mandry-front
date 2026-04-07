'use client';
import { ReactNode } from 'react';
import css from './ProfileLayout.module.css';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import ProfileTabs from '@/components/ui/ProfileTabs/ProfileTabs';

interface ProfileLayoutProps {
  saved: ReactNode;
  my: ReactNode;
}

export default function ProfileLayout({ saved, my }: ProfileLayoutProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isMyStories = pathname === '/profile/my';

  return (
    <div className={css.layoutContainer}>
      <div className={css.innerWrapper}>
        <section className={css.userInfoSection}>
          {' '}
          {user && (
            <>
              <TravellerInfo
                name={user.name}
                avatar={user.avatarUrl}
                storiesCount={user.articlesAmount || 0}
              />
              <ProfileTabs />
            </>
          )}
        </section>
        <section className={css.storiesSection}>
          {isMyStories ? my : saved}
        </section>
      </div>
    </div>
  );
}
