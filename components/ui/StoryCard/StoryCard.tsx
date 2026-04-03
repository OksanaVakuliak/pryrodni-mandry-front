import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon/Icon';
import { Button } from '@/components/ui/Button/Button';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import styles from '@/components/ui/StoryCard/StoryCard.module.css';
import { Story } from '@/types/story';

type Props = {
  story: Story;
  href?: string;
  onSave?: () => void;
  priority?: boolean;
  sizes?: string;
};

export default function StoryCard({
  story,
  href,
  onSave,
  priority = false,
  sizes = '(max-width: 767px) 100vw, (max-width: 1439px) 50vw, 33vw',
}: Props) {
  const { title, img, ownerId, rate, _id } = story;
  const storyHref = href ?? `/stories/${_id}`;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper} tabIndex={-1} aria-hidden="true">
        <Image
          src={img}
          alt={title}
          fill
          className={styles.image}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
        />
      </div>

      <div className={styles.content}>
        <p className={styles.meta}>
          {ownerId.name}
          <span className={styles.metaSeparator}>·</span>
          {rate}
          <Icon name="icon-bookmark" width={16} height={16} className={styles.svg} />
        </p>

        <PageTitle className={styles.title} tag="h3">
          {title}
        </PageTitle>

        <div className={styles.actions}>
          <Link href={storyHref} className={styles.linkBtn}>
            Переглянути статтю
          </Link>

          <Button
            onClick={onSave}
            className={styles.iconBtn}
            variant="tertiary"
            aria-label="Зберегти статтю"
          >
            <Icon name="icon-bookmark" />
          </Button>
        </div>
      </div>
    </div>
  );
}
