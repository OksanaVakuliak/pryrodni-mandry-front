'use client';
import { ReactNode } from 'react';
import css from './ProfileLayout.module.css';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import ProfileTabs from '@/components/ui/ProfileTabs/ProfileTabs';
import { CustomLink } from '@/components/ui/Link/Link';
import { useModalStore } from '@/lib/store/useModalStore';

interface ProfileLayoutProps {
  saved: ReactNode;
  my: ReactNode;
  modal: ReactNode;
  children: ReactNode;
}

export default function ProfileLayout({
  saved,
  my,
  modal,
  children,
}: ProfileLayoutProps) {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const isMyStories = pathname === '/profile/my';
  const openEditProfile = useModalStore((state) => state.openEditProfile);

  if (pathname.includes('confirm')) {
    return <>{children}</>;
  }

  return (
    <div className={css.layoutContainer}>
      <div className={css.innerWrapper}>
        <section
          className={css.userInfoSection}
          aria-label="Інформація профілю"
        >
          {user && (
            <>
              <TravellerInfo
                name={user.name}
                avatar={user.avatarUrl}
                storiesCount={user.articlesAmount || 0}
                isPriority
              >
                <CustomLink
                  variant="buttonProfile"
                  href="/profile/edit"
                  onClick={() => openEditProfile()}
                >
                  Відредагувати профіль
                </CustomLink>
              </TravellerInfo>
              <ProfileTabs />
            </>
          )}
        </section>
        <section className={css.storiesSection} aria-label="Статті профілю">
          {isMyStories ? my : saved}
        </section>
      </div>

      {modal}
    </div>
  );
}
