'use client';
import { CustomLink } from '@/components/ui/Link/Link';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import css from './join.module.css';

const Join = () => {
  const { isAuthenticated } = useAuthStore();
  return (
    <section className={`container ${css.joinSection}`} id="join">
      <div className={css.wrapper}>
        <div className={css.content}>
          <PageTitle tag="h2" className={css.joinTitle}>
            Приєднуйся до спільноти свідомих мандрівників
          </PageTitle>
          <p className={css.text}>
            Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й
            внеском у збереження природи. Тут ти знайдеш однодумців, поради для
            сталих мандрів та натхнення для нових маршрутів Україною.
          </p>
          <CustomLink
            variant="textWithBorder"
            href={isAuthenticated ? '/profile' : '/register'}
            className={css.link}
          >
            {isAuthenticated ? 'Збережені статті' : 'Зареєструватися'}
          </CustomLink>
        </div>
      </div>
    </section>
  );
};

export default Join;
