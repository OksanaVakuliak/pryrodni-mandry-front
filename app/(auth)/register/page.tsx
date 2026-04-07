import { Metadata } from 'next';
import RegistrationForm from '@/components/RegisterPage/RegistrationForm/RegistrationForm';

export const metadata: Metadata = {
  title: 'Реєстрація',
  description: 'Долучайтесь до спільноти мандрівників Природні мандри.',

  openGraph: {
    title: 'Реєстрація — Природні мандри',
    description: 'Долучайтесь до спільноти мандрівників Природні мандри.',
    url: 'https://your-site.com/register',
    siteName: 'Природні мандри',
    images: [
      {
        url: '/Image/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Природні мандри — створення історії',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
};

export default function RegisterPage() {
  return (
    <main>
      <RegistrationForm />
    </main>
  );
}
