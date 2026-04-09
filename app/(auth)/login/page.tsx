import { Metadata } from 'next';
import LoginForm from '@/components/LoginPage/LoginForm/LoginForm';

export const metadata: Metadata = {
  title: 'Вхід',
  description: 'Вітаємо у спільноті мандрівників Природні мандри.',

  openGraph: {
    title: 'Вхід — Природні мандри',
    description: 'Вітаємо у спільноті мандрівників Природні мандри.',
    url: 'https://pryrodni-mandry-front.vercel.app/login',
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

export default function LoginPage() {
  return <LoginForm />;
}
