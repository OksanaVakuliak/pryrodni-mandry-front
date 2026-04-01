import styles from './TravellrInfo.module.css';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { Button } from '@/components/ui/Button/Button';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
  onOpen?: () => void;
};

export default function TravellerInfo({
  name,
  avatar,
  storiesCount,
  onOpen,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <Avatar src={avatar} alt={name} size={80} />
      </div>

      <div className={styles.content}>
        <PageTitle tag="h3">{name}</PageTitle>
        <p className={styles.meta}>Статей: {storiesCount}</p>
      </div>

      <Button onClick={onOpen} className={styles.infoBtn} variant="tertiary">
        Переглянути профіль
      </Button>
    </div>
  );
}
