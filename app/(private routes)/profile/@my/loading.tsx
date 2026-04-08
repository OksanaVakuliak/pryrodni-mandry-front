import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';

export default function MyLoading() {
  return (
    <>
      <TravellersStories
        stories={[]}
        variant="noOwn"
        isLoading
        skeletonCount={6}
      />
    </>
  );
}
