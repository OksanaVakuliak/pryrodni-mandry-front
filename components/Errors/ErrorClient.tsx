'use client';

import { Button } from '@/components/ui/Button/Button';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';

interface ErrorClientProps {
  error: unknown;
  reset: () => void;
}

export default function ErrorClient({ error, reset }: ErrorClientProps) {
  const message =
    error instanceof Error
      ? error.message
      : 'Сталася помилка. Спробуйте ще раз.';

  return (
    <div className="problem-wrappererror">
      <div className="problem-inner">
        <PageTitle>Щось пішло не так</PageTitle>

        <p className="problem-text">{message}</p>

        <Button onClick={reset} variant="primary">
          Спробувати ще раз
        </Button>
      </div>
    </div>
  );
}
