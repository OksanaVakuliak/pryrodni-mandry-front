'use client';

import { useEffect, useRef, useState } from 'react';

import { getMe } from '@/lib/api/clientApi';
import { Loader } from '../ui/Loader/Loader';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const [isChecking, setIsChecking] = useState(true);
  const isInitialized = useRef(false);

  useEffect(() => {
    const validateSession = async () => {
      if (isInitialized.current) return;

      try {
        const user = await getMe();
        setUser(user);
      } catch {
        clearUser();
      } finally {
        isInitialized.current = true;
        setIsChecking(false);
      }
    };

    validateSession();
  }, [setUser, clearUser]);

  if (isChecking) return <Loader />;

  return <>{children}</>;
}
