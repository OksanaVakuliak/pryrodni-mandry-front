import Image from 'next/image';
import styles from './Avatar.module.css';

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
  const spritePath = '/Icons/sprite.svg';
  const placeholderId = 'icon-image';
  return (
    <div
      className={`${styles.avatarWrapper} ${className}`}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className={styles.avatarImage}
          priority={size > 100}
        />
      ) : (
        <svg
          width={size}
          height={size}
          className={styles.avatarSvg}
          aria-label={alt}
        >
          <use href={`${spritePath}#${placeholderId}`} />
        </svg>
      )}
    </div>
  );
};
