import { Metadata } from 'next';
import { StoryDetails } from '@/components/StoryPage/StoryDetails/StoryDetails';
import { getStory } from '@/lib/api/serverApi';

interface PageProps {
  params: Promise<{ storyId: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { storyId } = await params;
  const story = await getStory(storyId);

  if (!story) {
    return {
      title: 'Історія не знайдена | Природні мандри',
    };
  }

  const description = story.article.slice(0, 160).trim();

  return {
    title: `${story.title} | Природні мандри`,
    description,
    openGraph: {
      title: story.title,
      description,
      images: story.img ? [{ url: story.img, alt: story.title }] : [],
      type: 'article',
      publishedTime: story.date,
      authors: story.ownerId?.name ? [story.ownerId.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: story.title,
      description,
      images: story.img ? [story.img] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { storyId } = await params;
  return <StoryDetails storyId={storyId} />;
}
