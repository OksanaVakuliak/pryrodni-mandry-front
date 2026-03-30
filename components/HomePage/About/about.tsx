import Image from "next/image";
import css from './about.module.css';

const About = () => {
    return (
        <section className={`container ${css.aboutSection}`}>
            <div>
            <div className={css.content}>
                <h2 className={css.title}>Мандруй екологічно та відкривай нові горизонти</h2>
                <p className={css.text}>Наш проєкт створений для тих, хто хоче досліджувати Україну відповідально. Ми допоможемо знайти унікальні маршрути, які поєднують красу природи, локальну культуру та принципи сталого туризму.</p>
            </div>
            <ul className={css.list}>
                <li className={css.item}>
                    <h3 className={css.itemTitle}>Еко-маршрути по Україні</h3>
                    <p className={css.itemText}>Від Карпат до Чорного моря — добірка локацій, де можна подорожувати без шкоди для довкілля.</p>
                </li>
                <li className={css.item}>
                    <h3 className={css.itemTitle}>Практичні екологічні поради</h3>
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
            />
        </section>
)
};

export default About;