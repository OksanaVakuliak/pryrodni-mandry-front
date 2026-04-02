import { StoryDetails } from '@/components/StoryPage/StoryDetails';

interface PageProps {
  params: Promise<{ storyId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { storyId } = await params;
  return <StoryDetails storyId={storyId} />;
}
