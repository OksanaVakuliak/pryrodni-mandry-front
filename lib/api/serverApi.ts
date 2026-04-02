import { Traveller } from '@/types/traveller';
import { cookies } from 'next/headers';
import instance from './api';

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};

export const getTravellerByIdServer = async (
  id: string,
): Promise<Traveller> => {
  const { data } = await instance.get<Traveller>(`/travellers/${id}`);
  return data;
};
