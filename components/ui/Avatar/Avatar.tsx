import Image from 'next/image';
import styles from './Avatar.module.css';
import { Icon } from '../Icon/Icon';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}
export const Avatar = ({
  src,
  alt = 'User avatar',
  size = 40,
  className = '',
}: AvatarProps) => {
  return (
    <div
      className={`${styles.avatarWrapper} ${className}`}
      style={{ '--avatar-size': `${size}px` } as React.CSSProperties}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={styles.avatarImage}
        />
      ) : (
        <Icon
          name="icon-image"
          width={size}
          height={size}
          className={styles.avatarSvg}
          aria-label={alt}
        />
      )}
    </div>
  );
};
