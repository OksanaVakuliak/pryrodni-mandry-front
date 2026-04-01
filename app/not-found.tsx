'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
    <div className="problem-wrapper">
      <div className="problem-inner">
        <h1 className="problem-code">404</h1>

        <p className="problem-text">
          Сторінку не знайдено або вона більше не існує
        </p>

        <Link href="/" className="problem-button">
          На головну
        </Link>

        <p className="problem-redirect">
          Перенаправлення через {seconds} сек...
        </p>
      </div>
    </div>
  );
}
