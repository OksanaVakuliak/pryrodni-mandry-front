import { Traveller, TravellersResponse } from '@/types/traveller';
import instance from './api';

export const getTravellers = async (
  perPage: number = 10,
  page: number = 1,
): Promise<Traveller[]> => {
  const { data } = await instance.get<TravellersResponse>('/travellers', {
    params: { perPage, page },
  });

  return data.data.users;
};
