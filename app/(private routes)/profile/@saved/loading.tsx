import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/ui/TravellersStories/TravellersStories';
import css from '../ProfileLayout.module.css';

export default function SavedLoading() {
  return (
    <>
      <section className={css.userInfoSection}>
        <TravellerInfo
          name=""
          avatar=""
          storiesCount={0}
          variant="profile"
          isLoading
        />
      </section>
      <TravellersStories
        stories={[]}
        variant="noSaved"
        isLoading
        skeletonCount={6}
      />
    </>
  );
}
