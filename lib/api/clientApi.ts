import instance from './api';
import { Story } from '@/types/Stories';
import { Category } from '@/types/Category';
import { Traveller, TravellersResponse } from '@/types/traveller';

export const clientApi = {
  stories: {
    getAll: async () => {
      const { data } = await instance.get<Story[]>('/stories');
      return data;
    },
  },
  categories: {
    getAll: async () => {
      const { data } = await instance.get<Category[]>('/categories');
      return data;
    },
  },
};


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
