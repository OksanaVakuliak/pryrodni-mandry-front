'use client';

import ErrorClient from '@/components/Errors/ErrorClient';

export default function Error({
  error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  return <ErrorClient error={error} reset={reset} />;
}
