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
  title: 'Природні мандри',
  description: 'Travel app',
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
