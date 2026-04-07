'use client';

import { useAuthStore } from '@/lib/store/useAuthStore';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import ProfileTabs from '@/components/ui/ProfileTabs/ProfileTabs';
import { CustomLink } from '@/components/ui/Link/Link';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <>
      <TravellerInfo
        name={user.name}
        avatar={user.avatarUrl}
        storiesCount={user.articlesAmount || 0}
      >
        <CustomLink variant="buttonProfile" href="profile/edit">
          Відредагувати профіль
        </CustomLink>
      </TravellerInfo>
      <ProfileTabs />
    </>
  );
}
