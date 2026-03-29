import Image from 'next/image';
import styles from './TravellrInfo.module.css';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
};

export default function TravellerInfo({ name, avatar, storiesCount }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <Image src={avatar} alt={name} fill className={styles.avatar} />
      </div>

      <div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.meta}>Статей: {storiesCount}</p>
      </div>
    </div>
  );
}
