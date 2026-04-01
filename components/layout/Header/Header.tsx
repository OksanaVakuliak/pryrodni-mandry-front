'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import AuthBar from '../AuthBar/AuthBar';
import { CustomLink } from '@/components/ui/Link/Link';
import { Icon } from '@/components/ui/Icon/Icon';
import UserBar from '../UserBar/UserBar';
import css from './header.module.css';

const Header = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  const iconId = 'icon-Logo';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <header className={css.headerContainer}>
      <div className={css.container}>
        <Link href="/" className={css.logoLink}>
          <div className={css.logoContainer}>
            <svg className={css.svg}>
              <use href={`/Icons/sprite.svg#${iconId}`} />
            </svg>
          </div>
        </Link>

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
          {isAuthenticated && (
            <Link href="/profile" className={css.navLink}>
              Мій профіль
            </Link>
          )}
          <div className={css.auth}>
            {isAuthenticated ? <UserBar /> : <AuthBar />}
          </div>
        </nav>
        <div className={css.tabletContainer}>
          <CustomLink
            href="/stories/new"
            variant="primary"
            className={css.authBtn}
          >
            Опублікувати статтю
          </CustomLink>
          <button onClick={toggleMenu} className={css.burgerButton}>
            <Icon className={css.burgerIcon} name="icon-burger_menu" />
          </button>
        </div>
      </div>
      <div className={`${css.modalTablet} ${isMenuOpen ? css.isOpen : ''}`}>
        <button onClick={toggleMenu} className={css.closeButton}>
          <Icon name="icon-close" />
        </button>
        <nav className={css.navTablet}>
          <Link href="/" className={css.navLinkTablet}>
            Головна
          </Link>
          <Link href="/stories" className={css.navLinkTablet}>
            Статті
          </Link>
          <Link href="/travellers" className={css.navLinkTablet}>
            Еко-мандрівники
          </Link>
          {isAuthenticated && (
            <Link href="/profile" className={css.navLinkTablet}>
              Мій профіль
            </Link>
          )}
          <div className={css.auth}>
            {isAuthenticated ? <UserBar /> : <AuthBar />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
