'use client';

import styles from './problem.module.css';

export default function Error({
  error,
  reset,
}: {
  error: unknown;
  reset: () => void;
}) {
  const message =
    error instanceof Error
      ? (error as Error).message
      : 'Сталася помилка. Спробуйте ще раз.';

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Щось пішло не так</h1>

        <p className={styles.text}>{message}</p>

        <button onClick={reset} className={styles.buttonerror}>
          Спробувати ще раз
        </button>
      </div>
    </div>
  );
}
