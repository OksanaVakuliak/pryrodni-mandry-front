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
          <Link
            href="/"
            className={css.link}
            aria-label="Природні Мандри — на головну"
          >
            <Icon name={'icon-Logo'} className={css.svgLogo} />
          </Link>
          <div className={css.socialContainer}>
            <a
              href="https://www.facebook.com/"
              className={css.link}
              aria-label="Ми на Facebook"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name={'icon-Facebook'} className={css.socialLink} />
            </a>
            <a
              href="https://www.instagram.com/"
              className={css.link}
              aria-label="Ми на Instagram"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name={'icon-Instagram'} className={css.socialLink} />
            </a>
            <a
              href="https://x.com/"
              className={css.link}
              aria-label="Ми на X (Twitter)"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name={'icon-Twiter'} className={css.socialLink} />
            </a>
            <a
              href="https://www.youtube.com/"
              className={css.link}
              aria-label="Ми на YouTube"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon name={'icon-Youtube'} className={css.socialLink} />
            </a>
          </div>
          <nav className={css.navigation} aria-label="Навігація сайтом">
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
