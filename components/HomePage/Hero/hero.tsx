import Link from 'next/link';
import Image from "next/image";
import css from './hero.module.css';


const Hero = () => {
    return (
        <section className={`container ${css.heroSection}`}>
            <div className={css.wrapper}>
                <div className={css.heroContent}>
                    <h1 className={css.heroTitle}>Відкрий Україну заново — еко-мандри для натхнення</h1>
                    <p className={css.heroText}>Подорожуй екологічно, відкривай заповідні місця, гори та річки України. Ми зібрали маршрути, які допоможуть побачити красу природи без шкоди для неї.</p>
                    <a className={css.heroLink} href="#join" >Доєднатись до мандрів</a>
                </div>
                <Image
                    className={css.heroImage}
                    src="/Image/Hero.webp"
                    alt="hero"
                    width={200}
                    height={200}
                />
            </div>
        </section>);
}

export default Hero;