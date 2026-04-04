import styles from './TravellrInfo.module.css';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
  children?: React.ReactNode;
  variant?: 'card' | 'profile';
};

export default function TravellerInfo({
  name,
  avatar,
  storiesCount,
  children,
  variant = 'profile',
}: Props) {
  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
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
