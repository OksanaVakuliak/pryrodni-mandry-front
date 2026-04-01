import { StoryPage } from '@/components/StoryPage/StoryPage';

interface PageProps {
  params: Promise<{ storyId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { storyId } = await params;
  return <StoryPage storyId={storyId} />;
}
