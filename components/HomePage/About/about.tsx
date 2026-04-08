import Image from "next/image";
import { PageTitle } from "@/components/ui/PageTitle/PageTitle";
import css from './about.module.css';

const About = () => {
    return (
        <section className={`container ${css.aboutSection}`}>
            <div>
            <div className={css.content}>
                <PageTitle tag="h2" className={css.aboutTitle}>Мандруй екологічно та відкривай нові горизонти</PageTitle>
                <p className={css.text}>Наш проєкт створений для тих, хто хоче досліджувати Україну відповідально. Ми допоможемо знайти унікальні маршрути, які поєднують красу природи, локальну культуру та принципи сталого туризму.</p>
            </div>
            <ul className={css.list}>
                <li className={css.item}>
                    <PageTitle tag="h3" className={css.itemTitle}>Еко-маршрути по Україні</PageTitle>
                    <p className={css.itemText}>Від Карпат до Чорного моря — добірка локацій, де можна подорожувати без шкоди для довкілля.</p>
                </li>
                <li className={css.item}>
                    <PageTitle tag="h3" className={css.itemTitle}>Практичні екологічні поради</PageTitle>
                    <p className={css.itemText}>Дізнайся, як зменшити свій екологічний слід під час мандрів, та зробити подорож комфортною й свідомою.</p>
        
                </li>
                </ul>
            </div>
            <Image
                className={css.image}
                width={335}
                height={410}
                src="/Image/About.webp"
                alt="forest"
                sizes="(min-width: 1440px) 644px, (min-width: 768px) 704px, 335px"
                loading="eager"
            />
        </section>
)
};

export default About;