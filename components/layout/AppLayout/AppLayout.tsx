'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header/Header';
import AuthHeader from '@/components/layout/AuthHeader/AuthHeader';
import Footer from '@/components/layout/Footer/Footer';
import AuthFooter from '@/components/layout/AuthFooter/AuthFooter';
import css from './appLayout.module.css';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <>
      <div className={css.appWrapper}>
        {isAuthPage ? <AuthHeader /> : <Header />}
        <main className={css.mainContent}>{children}</main>
        {isAuthPage ? <AuthFooter /> : <Footer />}
      </div>
    </>
  );
}
