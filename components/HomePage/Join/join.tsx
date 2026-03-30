'use client';
import Link from "next/link";
import css from './join.module.css';
import { useAuthStore } from "@/lib/store/useAuthStore";

const Join = () => {
    const { isAuthenticated } = useAuthStore();
    // const isAuthenticated = true;
    return (
        <section className={`container ${css.joinSection}`} id='join'>
            <div className={css.wrapper}>
                <div className={css.content}>
                    <h2 className={css.title}>Приєднуйся до спільноти свідомих мандрівників</h2>
                    <p className={css.text}>Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й внеском у збереження природи. Тут ти знайдеш однодумців, поради для сталих мандрів та натхнення для нових маршрутів Україною.</p>
                    <Link
                        href={isAuthenticated ? "/profile" : "/auth/register"}
                        className={css.link}
                    >
                        {isAuthenticated ? "Збережені статті" : "Зареєструватися"}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Join;