import { Metadata } from 'next';
import { getTravellerByIdServer } from '@/lib/api/serverApi';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { TravellerStoriesList } from '@/components/TravelerPage/TravellerStoriesList/TravellerStoriesList';
import TravellerInfo from '@/components/ui/TravellerInfo/TravellerInfo';

interface Props {
  params: { travellerId: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const traveller = await getTravellerByIdServer(params.travellerId);
    return { title: `Мандрівник ${traveller.name} | Природні Мандри` };
  } catch {
    return { title: 'Мандрівник | Природні Мандри' };
  }
}

export default async function TravellerPage({ params }: Props) {
  const { travellerId } = params;
  const traveller = await getTravellerByIdServer(travellerId);

  return (
    <main>
      <div>
        <TravellerInfo
          name={traveller.name}
          avatar={traveller.avatarUrl}
          storiesCount={traveller.articlesAmount}
        />

        <div>
          <PageTitle tag="h2">Статті Мандрівника</PageTitle>

          <TravellerStoriesList travellerId={travellerId} />
        </div>
      </div>
    </main>
  );
}
