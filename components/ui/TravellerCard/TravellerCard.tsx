import styles from './TravellrCard.module.css';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
};

export default function TravellerInfo({ name, avatar, storiesCount }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <Avatar src={avatar} alt={name} size={48} />
      </div>

      <div>
        <PageTitle tag="h3">{name}</PageTitle>
        <p className={styles.meta}>Статей: {storiesCount}</p>
      </div>
    </div>
  );
}
