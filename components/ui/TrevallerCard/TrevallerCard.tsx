import Image from 'next/image';
import styles from './TrevallerCard.module.css';
import { Traveller } from '@/types/traveller';

type Props = {
  traveller: Traveller;
  onOpen?: () => void;
};

export default function TravellerCard({ traveller, onOpen }: Props) {
  const name = traveller.name;
  const avatar = traveller.avatarUrl || '';
  const storiesCount = traveller.storiesCount ?? traveller.articlesAmount ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        {avatar ? (
          <Image src={avatar} alt={name} fill className={styles.avatar} />
        ) : (
          <div className={styles.avatar} />
        )}
      </div>

      <h3 className={styles.name}>{name}</h3>

      <p className={styles.meta}>Статей: {storiesCount}</p>

      <button onClick={onOpen} className={styles.button}>
        Переглянути профіль
      </button>
    </div>
  );
}
