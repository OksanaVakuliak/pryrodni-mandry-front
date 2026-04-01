import { CustomLink } from '@/components/ui/Link/Link';
import css from './authBar.module.css';

const AuthBar = () => {
  return (
    <div className={css.authContainer}>
      <CustomLink href="/login" variant="secondary" className={css.authBtn}>
        Вхід
      </CustomLink>
      <CustomLink href="/register" variant="primary" className={css.authBtn}>
        Реєстрація
      </CustomLink>
    </div>
  );
};
export default AuthBar;
