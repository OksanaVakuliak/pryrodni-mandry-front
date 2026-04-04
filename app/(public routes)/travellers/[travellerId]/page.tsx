import TravellerPublicProfile from '@/components/TravelerPage/TravellerPublicProfile/TravellerPublicProfile';
import { getTravellerByIdServer } from '@/lib/api/serverApi';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ travellerId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { travellerId } = await params;
  try {
    const traveller = await getTravellerByIdServer(travellerId);
    return { title: `Мандрівник ${traveller.name} | Природні Мандри` };
  } catch {
    return { title: 'Мандрівник | Природні Мандри' };
  }
}

export default async function TravellerPage({ params }: Props) {
  const { travellerId } = await params;

  const traveller = await getTravellerByIdServer(travellerId);

  return (
    <TravellerPublicProfile traveller={traveller} travellerId={travellerId} />
  );
}
