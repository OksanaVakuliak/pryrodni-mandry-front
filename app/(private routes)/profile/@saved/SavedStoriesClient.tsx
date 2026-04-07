'use client';

import { useMemo } from 'react';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';
import { useStoriesStore } from '@/lib/store/useStoriesStore';
import { Story } from '@/types/story';

type Props = {
  initialStories: Story[];
};

export default function SavedStoriesClient({ initialStories }: Props) {
  const savedStories = useStoriesStore((s) => s.savedStories);

  const visibleStories = useMemo(
    () => initialStories.filter((story) => savedStories[story._id] !== false),
    [initialStories, savedStories],
  );

  return <TravellersStories stories={visibleStories} />;
}
