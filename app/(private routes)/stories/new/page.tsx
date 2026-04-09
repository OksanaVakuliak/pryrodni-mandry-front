import AddStoryForm from '@/components/AddStory/AddStoryForm/addStoryForm';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import type { Metadata } from 'next';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Створити історію',
  description:
    'Поділіться своєю історією подорожі, пригод та відкриттів разом із спільнотою Природні мандри.',

  openGraph: {
    title: 'Створити нову історію — Природні мандри',
    description:
      'Опублікуйте власну історію подорожі та надихайте інших досліджувати світ разом із вами.',
    url: 'https://pryrodni-mandry-front.vercel.app/stories/new',
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

export default function CreateStoryPage() {
  return (
    <div className="container">
      <PageTitle tag="h1" className={css.title}>
        Створити нову історію
      </PageTitle>
      <AddStoryForm />
    </div>
  );
}
