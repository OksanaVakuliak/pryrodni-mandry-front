'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorWhileSavingModal from '@/components/ui/ErrorWhileSavingModal/ErrorWhileSavingModal';

type AuthModalContextType = {
  openAuthModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openAuthModal = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const handleLogin = () => {
    close();
    router.push('/login');
  };

  const handleRegister = () => {
    close();
    router.push('/register');
  };

  return (
    <AuthModalContext.Provider value={{ openAuthModal }}>
      {children}
      <ErrorWhileSavingModal
        isOpen={isOpen}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onClose={close}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal(): AuthModalContextType {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error('useAuthModal must be used within AuthModalProvider');
  }
  return ctx;
}
