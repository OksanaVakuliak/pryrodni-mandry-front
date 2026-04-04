import styles from './TravallerCard.module.css';
import { Traveller } from '@/types/traveller';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import { CustomLink } from '@/components/ui/Link/Link';

type Props = {
  traveller: Traveller;
};

export default function TravellerCard({ traveller }: Props) {
  return (
    <div className={styles.card}>
      <TravellerInfo
        name={traveller.name}
        avatar={traveller.avatarUrl}
        storiesCount={traveller.articlesAmount}
        variant="card"
      >
        <CustomLink
          href={`/travellers/${traveller._id}`}
          variant="tertiary"
          className={styles.profileLink}
        >
          Переглянути профіль
        </CustomLink>
      </TravellerInfo>
    </div>
  );
}
