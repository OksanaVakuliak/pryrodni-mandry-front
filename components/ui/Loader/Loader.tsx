import { Icon } from '@/components/ui/Icon/Icon';
import styles from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <Icon name="icon-eco" className={styles.loader} />
    </div>
  );
};
