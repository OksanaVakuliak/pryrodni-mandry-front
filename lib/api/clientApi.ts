import { Story } from '@/types/story';
import { Traveller, TravellersResponse } from '@/types/traveller';
import instance from './api';

export const getPopularStories = async (): Promise<Story[]> => {
  const res = await instance.get<Story[]>('/stories/popular');
  return res.data;
};

export const getTravellers = async (
  perPage: number = 10,
  page: number = 1,
): Promise<Traveller[]> => {
  const { data } = await instance.get<TravellersResponse>('/travellers', {
    params: { perPage, page },
  });

  return data.data.users;
};
