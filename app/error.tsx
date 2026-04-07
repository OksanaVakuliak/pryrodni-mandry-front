'use client';

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
    <div className="problem-wrappererror">
      <div className="problem-inner">
        <h1 className="problem-title">Щось пішло не так</h1>

        <p className="problem-text">{message}</p>

        <button onClick={reset} className="problem-buttonerror">
          Спробувати ще раз
        </button>
      </div>
    </div>
  );
}
