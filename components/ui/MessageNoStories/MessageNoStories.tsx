import styles from './MessageNoStories.module.css';
import { CustomLink } from '@/components/ui/Link/Link';

type Variant = 'noStories' | 'noSaved' | 'noOwn';

type Props = {
  variant: Variant;
  onClick?: () => void;
};

const contentMap: Record<
  Variant,
  { text: string; buttonText: string; href: string }
> = {
  noStories: {
    text: 'Цей користувач ще не публікував історій',
    buttonText: 'Назад до історій',
    href: '/stories',
  },
  noSaved: {
    text: 'У вас ще немає збережених історій, мерщій збережіть вашу першу історію!',
    buttonText: 'До історій',
    href: '/stories',
  },
  noOwn: {
    text: 'Ви ще нічого не публікували, поділіться своєю першою історією',
    buttonText: 'Опублікувати історію',
    href: '/stories/new',
  },
};

export default function MessageNoStories({ variant, onClick }: Props) {
  const content = contentMap[variant];

  if (!content) return null;

  const { text, buttonText, href } = content;

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>{text}</p>

      <CustomLink
        href={href}
        onClick={onClick}
        className={styles.button}
        variant="button"
      >
        {buttonText}
      </CustomLink>
    </div>
  );
}
