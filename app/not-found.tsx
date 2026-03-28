'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './problem.module.css';

export default function NotFound() {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  // таймер
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // редирект
  useEffect(() => {
    if (seconds === 0) {
      router.push('/');
    }
  }, [seconds, router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.code}>404</h1>

        <p className={styles.text}>
          Сторінку не знайдено або вона більше не існує
        </p>

        <Link href="/" className={styles.button}>
          На головну
        </Link>

        <p className={styles.redirect}>
          Перенаправлення через {seconds} сек...
        </p>
      </div>
    </div>
  );
}
