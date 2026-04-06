import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Природні Мандри',
    default: 'Природні Мандри',
  },
  description:
    'Приєднуйтесь до спільноти мандрівників "Природні Мандри". Увійдіть або зареєструйтесь, щоб ділитися своїми історіями.',
  openGraph: {
    title: 'Природні Мандри — Авторизація',
    description:
      'Мінімалістичний інтерфейс для входу та реєстрації у спільноті мандрівників.',
    type: 'website',
    images: [
      {
        url: '/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Природні Мандри Авторизація',
      },
    ],
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="white-page">
      <main>{children}</main>
    </body>
  );
}
