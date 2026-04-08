import {
  Skeleton,
  SkeletonAvatar,
  SkeletonPageTitle,
  SkeletonButton,
} from '@/components/ui/Skeleton/Skeleton';
import cardStyles from './TravallerCard.module.css';
import infoStyles from '@/components/ui/TravellerInfo/TravellrInfo.module.css';

export function TravellerCardSkeleton() {
  return (
    <div className={cardStyles.card}>
      <div className={`${infoStyles.wrapper} ${infoStyles.card}`}>
        <div className={infoStyles.avatarWrapper}>
          <SkeletonAvatar width={130} height={130} />
        </div>

        <div className={infoStyles.content}>
          <SkeletonPageTitle tag="h3" width={120} />
          <Skeleton variant="text" width={80} />
        </div>

        <SkeletonButton width={130} />
      </div>
    </div>
  );
}
