import Image from 'next/image';
import { Icon } from '@/components/ui/Icon/Icon';
import { Button } from '@/components/ui/Button/Button';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import styles from '@/components/ui/StoryCard/StoryCard.module.css';

type Props = {
  title: string;
  img: string;
  author: string;
  createdAt: string;
  onOpen?: () => void;
  onSave?: () => void;
};

export default function StoryCard({
  title,
  img,
  author,
  createdAt,
  onOpen,
  onSave,
}: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={img} alt={title} fill className={styles.image} />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {author} • {createdAt}
          <Icon
            name="icon-bookmark"
            width={16}
            height={16}
            className={styles.svg}
          ></Icon>
        </p>

        <PageTitle className={styles.title}>{title}</PageTitle>

        <div className={styles.actions}>
          <Button
            onClick={onOpen}
            className={styles.infoBtn}
            variant="tertiary"
          >
            Переглянути статтю
          </Button>

          <Button
            onClick={onSave}
            className={styles.iconBtn}
            variant="tertiary"
          >
            <Icon name="icon-bookmark"></Icon>
          </Button>
        </div>
      </div>
    </div>
  );
}
