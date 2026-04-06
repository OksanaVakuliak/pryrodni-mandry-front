import { Skeleton } from '../Skeleton/Skeleton';
import { Icon } from '@/components/ui/Icon/Icon';

import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <div className={css.wrapper}>
        <Icon name="icon-eco" className={css.loader} />
      </div>

      <div className={css.skeletonUnderlay}>
        <Skeleton limit={6} />
      </div>
    </div>
  );
};
