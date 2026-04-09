'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Loader } from '../ui/Loader/Loader';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [isChecking, setIsChecking] = useState(true);
  const isInitialized = useRef(false);
  const router = useRouter();
  const pathname = usePathname();
  const prevAuthRef = useRef<boolean | null>(null);

  useEffect(() => {
    const validateSession = async () => {
      if (isInitialized.current) return;

      try {
        await checkAuth();
      } finally {
        isInitialized.current = true;
        setIsChecking(false);
      }
    };

    validateSession();
  }, [checkAuth]);

  useEffect(() => {
    if (isChecking) return;

    if (prevAuthRef.current === null) {
      prevAuthRef.current = isAuthenticated;
      return;
    }

    if (prevAuthRef.current && !isAuthenticated) {
      const privateRoutes = ['/profile', '/stories/new'];
      const isPrivate = privateRoutes.some((r) => pathname?.startsWith(r));
      if (isPrivate) {
        router.push('/login');
      }
    }

    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, isChecking, router, pathname]);

  if (isChecking) return <Loader />;

  return <>{children}</>;
}
