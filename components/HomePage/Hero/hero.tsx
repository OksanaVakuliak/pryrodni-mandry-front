import Image from 'next/image';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import css from './hero.module.css';

const Hero = () => {
  return (
    <section className={`container ${css.heroSection}`}>
      <div className={css.wrapper}>
        <div className={css.heroContent}>
          <PageTitle tag="h1" className={css.heroTitle}>
            Відкрий Україну заново — еко-мандри для натхнення
          </PageTitle>
          <p className={css.heroText}>
            Подорожуй екологічно, відкривай заповідні місця, гори та річки
            України. Ми зібрали маршрути, які допоможуть побачити красу природи
            без шкоди для неї.
          </p>
          <a className={css.heroLink} href="#join">
            Доєднатись до мандрів
          </a>
        </div>
        <Image
          className={css.heroImage}
          width={335}
          height={469}
          src="/Image/Hero.webp"
          alt="mountains"
          loading="eager"
        />
      </div>
    </section>
  );
};

export default Hero;
