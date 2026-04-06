import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';
import { getServerProfileMyStories } from '@/lib/api/serverApi';
import { Story } from '@/types/story';

export default async function MyStoriesPage() {
  let stories: Story[] = [];

  try {
    const response = await getServerProfileMyStories(1, 6);

    if (response && Array.isArray(response.stories)) {
      stories = response.stories;
    } else {
      stories = [];
    }
    stories = response.stories;
  } catch (error) {
    stories = [];
  }

  return <TravellersStories stories={stories} />;
}
