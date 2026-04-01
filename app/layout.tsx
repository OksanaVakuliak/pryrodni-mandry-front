import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/components/layout/QueryProvider/QueryProvider';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';

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
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
