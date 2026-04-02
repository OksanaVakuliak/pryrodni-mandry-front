import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/layout/QueryProvider/QueryProvider';
import AppLayout from '@/components/layout/AppLayout/AppLayout';
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Природні Мандри',
    default: 'Природні Мандри',
  },
  description:
    'Приєднуйтесь до спільноти мандрівників "Природні Мандри". Увійдіть або зареєструйтесь, щоб ділитися своїми історіями.',
  openGraph: {
    title: 'Природні Мандри — Головна сторінка',
    description:
      'Мінімалістичний інтерфейс для входу та реєстрації у спільноті мандрівників.',
    type: 'website',
    images: [
      {
        url: '/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Природні Мандри Головна сторінка',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={montserrat.className}>
        <QueryProvider>
          <AppLayout>{children}</AppLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
