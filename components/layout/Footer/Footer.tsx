import css from './footer.module.css';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';

const Footer = () => {
  const date = new Date();
  const dateYear = date.getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.linksContainer}>
          <Link href="/" className={css.link}>
            <Icon name={'icon-Logo'} className={css.svgLogo} />
          </Link>
          <div className={css.socialContainer}>
            <a href="https://www.facebook.com/" className={css.link}>
              <Icon name={'icon-Facebook'} className={css.socialLink} />
            </a>
            <a href="https://www.instagram.com/" className={css.link}>
              <Icon name={'icon-Instagram'} className={css.socialLink} />
            </a>
            <a href="https://x.com/" className={css.link}>
              <Icon name={'icon-Twiter'} className={css.socialLink} />
            </a>
            <a href="https://www.youtube.com/" className={css.link}>
              <Icon name={'icon-Youtube'} className={css.socialLink} />
            </a>
          </div>
          <nav className={css.navigation}>
            <Link href="/" className={css.navLink}>
              Головна
            </Link>
            <Link href="/stories" className={css.navLink}>
              Статті
            </Link>
            <Link href="/travellers" className={css.navLink}>
              Еко-мандрівники
            </Link>
          </nav>
        </div>
        <hr className={css.hr} />
        <p
          className={css.copyRight}
        >{`© ${dateYear} Природні Мандри. Усі права захищені.`}</p>
      </div>
    </footer>
  );
};

export default Footer;
