'use client';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import MessageNoStories from '@/components/ui/MessageNoStories/MessageNoStories';

export default function Page() {
  return (
    <>
      <TravellerInfo
        name="Анастасія Олійник"
        avatar="/avatar.jpg"
        storiesCount={12}
      />
      <MessageNoStories />
    </>
  );
}
