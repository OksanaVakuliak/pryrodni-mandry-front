import styles from './TravellrInfo.module.css';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
  children?: React.ReactNode;
};

export default function TravellerInfo({
  name,
  avatar,
  storiesCount,
  children,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <Avatar src={avatar} alt={name} size={130} className={styles.avatar} />
      </div>
      <div className={styles.content}>
        <PageTitle tag="h3">{name}</PageTitle>
        <p className={styles.meta}>Статей: {storiesCount}</p>
      </div>
      {children} {/* 🔥 сюда прокидываем кнопку */}
    </div>
  );
}
