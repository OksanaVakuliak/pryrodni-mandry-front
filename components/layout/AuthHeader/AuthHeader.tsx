import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';
import css from './authHeader.module.css';

const AuthHeader = () => {
  return (
    <header className={css.headerContainer}>
      <div className={css.container}>
        <Link href="/" className={css.link}>
          <Icon name={'icon-Logo'} className={css.svgLogo} />
        </Link>
      </div>
    </header>
  );
};
export default AuthHeader;
