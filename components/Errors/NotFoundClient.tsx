'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CustomLink } from '@/components/ui/Link/Link';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

interface NotFoundClientProps {
  initialSeconds?: number;
}

export default function NotFoundClient({
  initialSeconds = 5,
}: NotFoundClientProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      router.push('/');
    }
  }, [seconds, router]);

  return (
    <div className="problem-wrapper">
      <div className="problem-inner">
        <PageTitle className="problem-code">404</PageTitle>

        <p className="problem-text">
          Сторінку не знайдено або вона більше не існує
        </p>

        <CustomLink href="/" variant="button">
          На головну
        </CustomLink>

        <p className="problem-redirect">
          Перенаправлення через {seconds} сек...
        </p>
      </div>
    </div>
  );
}
