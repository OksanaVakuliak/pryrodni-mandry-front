import styles from './TravallerCard.module.css';
import { Traveller } from '@/types/traveller';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';
import Link from 'next/link';

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
      >
        <Link href={`/travellers/${traveller._id}`} className={styles.link}>
          Переглянути профіль
        </Link>
      </TravellerInfo>
    </div>
  );
}
