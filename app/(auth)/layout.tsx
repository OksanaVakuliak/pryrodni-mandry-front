import { Metadata } from 'next';
import AuthHeader from '@/components/Auth/AuthHeader/AuthHeader';
import AuthFooter from '@/components/Auth/AuthFooter/AuthFooter';

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
    <>
      <AuthHeader />

      <main>{children}</main>

      <AuthFooter />
    </>
  );
}
