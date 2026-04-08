import { Metadata } from 'next';
import TravellersList from '@/components/TravellersPage/TravellersList/TravellersList';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description:
    'Познайомтеся зі спільнотою "Природні Мандри". Відкривайте нові обличчя, читайте історії успіху та надихайтеся досвідом інших дослідників природи.',
  openGraph: {
    title: 'Мандрівники спільноти "Природні Мандри"',
    description:
      'Знайдіть однодумців для нових подорожей та дізнайтеся більше про активних учасників нашої спільноти.',
    images: [
      {
        url: '/public/Image/Hero.webp',
        width: 1200,
        height: 630,
        alt: 'Спільнота мандрівників',
      },
    ],
    type: 'website',
  },
};

const TravellersPage = () => {
  return (
    <div className="container">
      <TravellersList />
    </div>
  );
};
export default TravellersPage;
