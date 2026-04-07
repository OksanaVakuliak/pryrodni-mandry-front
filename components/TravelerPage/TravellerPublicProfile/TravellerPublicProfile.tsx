import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { TravellerStoriesList } from '@/components/TravelerPage/TravellerStoriesList/TravellerStoriesList';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import { Traveller } from '@/types/traveller';
import css from './TravellerPublicProfile.module.css';

interface TravellerPublicProfileProps {
  traveller: Traveller;
  travellerId: string;
}

const TravellerPublicProfile = ({
  traveller,
  travellerId,
}: TravellerPublicProfileProps) => {
  return (
    <section className={css.main} aria-label="Профіль мандрівника">
      <div className={css.container}>
        <TravellerInfo
          name={traveller.name}
          avatar={traveller.avatarUrl}
          storiesCount={traveller.articlesAmount}
        />

        <div className={css.storiesSection}>
          <PageTitle tag="h2" className={css.title}>
            Статті Мандрівника
          </PageTitle>

          <TravellerStoriesList travellerId={travellerId} />
        </div>
      </div>
    </section>
  );
};

export default TravellerPublicProfile;
