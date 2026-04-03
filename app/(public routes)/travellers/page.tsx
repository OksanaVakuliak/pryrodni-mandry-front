import { Metadata } from 'next';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import TravellersList from '@/components/TravellersPage/TravellersList/TravellersList';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description: 'Список свідомих мандрівників нашої спільноти',
};

const TravellersPage = () => {
  return (
    <main className="container">
      <PageTitle tag="h1" className="visually-hidden">
        Мандрівники
      </PageTitle>
      <TravellersList />
    </main>
  );
};
export default TravellersPage;
