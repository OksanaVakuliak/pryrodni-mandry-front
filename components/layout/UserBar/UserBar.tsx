import { CustomLink } from '@/components/ui/Link/Link';
import { Avatar } from '@/components/ui/Avatar/Avatar';
import { Icon } from '@/components/ui/Icon/Icon';
import { useAuthStore } from '@/lib/store/useAuthStore';
import css from './userBar.module.css';

const UserBar = () => {
  const { user } = useAuthStore();

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
        <button className={css.logoutBtn}>
          <Icon name="icon-logout" className={css.svgClose} />
        </button>
      </div>
    </div>
  );
};
export default UserBar;
