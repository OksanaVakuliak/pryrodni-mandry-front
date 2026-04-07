'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { confirmUpdateEmail } from '@/lib/api/clientApi';
import { Loader } from '@/components/ui/Loader/Loader';
import css from './Page.module.css';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { CustomLink } from '@/components/ui/Link/Link';

export default function EmailConfirmationPage() {
  const params = useParams();
  const tokenParam = params?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [seconds, setSeconds] = useState(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['confirmEmail', token],
    queryFn: () => confirmUpdateEmail(token!),
    retry: false,
    enabled: !!token,
  });

  useEffect(() => {
    if (!data) return;

    setUser(data);

    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [data, setUser]);

  useEffect(() => {
    if (seconds === 0 && data) {
      router.push('/profile');
    }
  }, [seconds, data, router]);

  if (isLoading) return <Loader />;

  return (
    <section className={`${css.container}`}>
      {isError ? (
        <div className={css.infoContainer}>
          <PageTitle tag="h2" className={css.title}>
            Невдача...
          </PageTitle>
          <p className={css.errorMessage}>
            На жаль, посилання недійсне або термін його дії вичерпано
          </p>

          <CustomLink className={css.button} href="/profile/edit">
            Повернутися до редагування
          </CustomLink>
        </div>
      ) : (
        <div className={css.infoContainer}>
          <PageTitle tag="h2" className={css.title}>
            Успіх!
          </PageTitle>
          <p className={css.successMessage}>Ваші дані успішно оновлено!</p>
          <p className={css.redirectMessage}>
            Перенаправлення на профіль через {seconds} сек...
          </p>
          <CustomLink className={css.button} href="/profile">
            Повернутися в профіль
          </CustomLink>
        </div>
      )}
    </section>
  );
}
