'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { confirmUpdateEmail } from '@/lib/api/clientApi';
import { Loader } from '@/components/ui/Loader/Loader';
import css from './Page.module.css';
import { Button } from '@/components/ui/Button/Button';

export default function EmailConfirmationPage() {
  const params = useParams();
  const tokenParam = params?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['confirmEmail', token],
    queryFn: () => confirmUpdateEmail(token!),
    retry: false,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setUser(data);

      const timer = setTimeout(() => {
        router.push('/profile');
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [data, router, setUser]);

  if (isLoading) return <Loader />;

  return (
    <div className={`${css.container} container`}>
      {isError ? (
        <>
          <p className={css.errorMessage}>
            На жаль, посилання недійсне або термін його дії вичерпано
          </p>

          <Button
            className={css.button}
            onClick={() => router.push('/profile/edit')}
          >
            Повернутися до редагування
          </Button>
        </>
      ) : (
        <p className={css.successMessage}>Ваші дані успішно оновлено!</p>
      )}
    </div>
  );
}
