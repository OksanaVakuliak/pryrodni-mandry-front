import styles from './TravellrInfo.module.css';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonPageTitle,
} from '@/components/ui/Skeleton/Skeleton';

type Props = {
  name: string;
  avatar: string;
  storiesCount: number;
  children?: React.ReactNode;
  variant?: 'card' | 'profile';
  isLoading?: boolean;
};

export default function TravellerInfo({
  name,
  avatar,
  storiesCount,
  children,
  variant = 'profile',
  isLoading = false,
}: Props) {
  if (isLoading) {
    return (
      <div className={`${styles.wrapper} ${styles[variant]}`}>
        <div className={styles.avatarWrapper}>
          <SkeletonAvatar width={130} height={130} className={styles.avatar} />
        </div>
        <div className={styles.content}>
          <SkeletonPageTitle tag="h3" width={140} />
          <Skeleton variant="text" width={100} />
        </div>
        <div className={styles.actions}>
          <SkeletonButton width={170} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper} ${styles[variant]}`}>
      <div className={styles.avatarWrapper}>
        <Avatar src={avatar} alt={name} size={130} className={styles.avatar} />
      </div>
      <div className={styles.content}>
        <PageTitle tag="h3">{name}</PageTitle>
        <p className={styles.meta}>Статей: {storiesCount}</p>
      </div>
      <div className={styles.actions}>{children}</div>
    </div>
  );
}
