import Image from 'next/image';
import styles from './TravellerCard.module.css';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
  onOpen?: () => void;
};

export default function TravellerCard({
  name,
  avatar,
  storiesCount,
  onOpen,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrapper}>
        <Image src={avatar} alt={name} fill className={styles.avatar} />
      </div>

      <h3 className={styles.name}>{name}</h3>

      <p className={styles.meta}>Статей: {storiesCount}</p>

      <button onClick={onOpen} className={styles.button}>
        Переглянути профіль
      </button>
    </div>
  );
}
