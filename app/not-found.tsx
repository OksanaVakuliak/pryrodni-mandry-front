import type { Metadata } from 'next';
import NotFoundClient from '@/components/Errors/NotFoundClient';

export const metadata: Metadata = {
  title: '404 — Сторінку не знайдено',
  description: 'Запитувана сторінка не знайдена або була видалена.',
};

export default function NotFound() {
  return <NotFoundClient initialSeconds={5} />;
}
