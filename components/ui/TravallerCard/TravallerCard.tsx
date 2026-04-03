import Image from 'next/image';
import styles from './TravallerCard.module.css';
import { Traveller } from '@/types/traveller';
import { Button } from '@/components/ui/Button/Button';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

type Props = {
  traveller: Traveller;
  onOpen?: () => void;
};

export default function TravellerCard({ traveller, onOpen }: Props) {
  const name = traveller.name;
  const avatar = traveller.avatarUrl || '';
  const storiesCount = traveller.articlesAmount ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        {avatar ? (
          <Image src={avatar} alt={name} fill className={styles.avatar} />
        ) : (
          <div className={styles.avatar} />
        )}
      </div>

      <PageTitle className={styles.name} tag="h3">
        {name}
      </PageTitle>

      <p className={styles.meta}>Статей: {storiesCount}</p>

      <Button onClick={onOpen} className={styles.button} variant="tertiary">
        Переглянути профіль
      </Button>
    </div>
  );
}
