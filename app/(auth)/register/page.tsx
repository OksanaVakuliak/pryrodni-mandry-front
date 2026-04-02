import { Metadata } from 'next';
import RegistrationForm from '@/components/RegisterPage/RegistrationForm/RegistrationForm';

export const metadata: Metadata = {
  title: 'Реєстрація',
};

export default function RegisterPage() {
  return (
    <main>
      <RegistrationForm />
    </main>
  );
}
