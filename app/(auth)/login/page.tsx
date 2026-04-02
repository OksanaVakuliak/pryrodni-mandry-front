import { Metadata } from 'next';
import LoginForm from '@/components/LoginPage/LoginForm/LoginForm';

export const metadata: Metadata = {
  title: 'Вхід',
};

export default function LoginPage() {
  return (
    <main>
      <LoginForm />
    </main>
  );
}
