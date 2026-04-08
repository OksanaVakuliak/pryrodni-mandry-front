import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';

export default function SavedLoading() {
  return (
    <>
      <TravellersStories
        stories={[]}
        variant="noSaved"
        isLoading
        skeletonCount={6}
      />
    </>
  );
}
