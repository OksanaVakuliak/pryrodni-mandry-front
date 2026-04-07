import styles from './TravallerCard.module.css';
import { Traveller } from '@/types/traveller';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import { CustomLink } from '@/components/ui/Link/Link';
import clsx from 'clsx';

type Props = {
  traveller: Traveller;
  compact?: boolean;
};

export default function TravellerCard({ traveller, compact }: Props) {
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
          variant="secondary"
          className={clsx(styles.profileLink, compact && styles.compact)}
        >
          Переглянути профіль
        </CustomLink>
      </TravellerInfo>
    </div>
  );
}
