import { Icon } from '@/components/ui/Icon/Icon';
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderWrapper} role="status" aria-label="Завантаження">
      <Icon name="icon-eco" className={css.loader} />
    </div>
  );
};
