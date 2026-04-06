import { useEffect, useState } from 'react';
import { CustomLink } from '@/components/ui/Link/Link';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { Icon } from '@/components/ui/Icon/Icon';
import { useAuthStore } from '@/lib/store/useAuthStore';
import ConfirmModal from '@/components/ui/ConfirmModal/ConfirmModal';
import css from './userBar.module.css';

const UserBar = () => {
  const { user, clearUser } = useAuthStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleConfirmLogout = () => {
    clearUser();
    setIsMenuOpen(false);
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

  return (
    <div className={css.authContainer}>
      <CustomLink href="/stories/new" variant="primary" className={css.authBtn}>
        Опублікувати статтю
      </CustomLink>
      <div className={css.stateContainer}>
        <div className={css.avatarContaner}>
          <Avatar src={user?.avatarUrl} alt={user?.name} size={32}></Avatar>
          <span className={css.userName}>{user?.name || "Ім'я"}</span>
        </div>
        <button onClick={toggleMenu} className={css.logoutBtn}>
          <Icon name="icon-logout" className={css.svgClose} />
        </button>
      </div>
      {isMenuOpen && (
        <ConfirmModal
          isOpen={isMenuOpen}
          onConfirm={handleConfirmLogout}
          onCancel={toggleMenu}
        />
      )}
    </div>
  );
};
export default UserBar;
