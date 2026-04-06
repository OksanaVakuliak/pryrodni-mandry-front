'use client';

import { useAuthStore } from '@/lib/store/useAuthStore';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import {} from '@/components/ui/';

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
