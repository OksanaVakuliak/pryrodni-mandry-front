import { Metadata } from 'next';
import TravellersList from '@/components/TravellersPage/TravellersList/TravellersList';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description: 'Список свідомих мандрівників нашої спільноти',
};

const TravellersPage = () => {
  return (
    <main className="container">
      <TravellersList />
    </main>
  );
};
export default TravellersPage;
