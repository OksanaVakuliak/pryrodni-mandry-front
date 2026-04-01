import instance from './api';
import { Story } from '@/types/Stories';
import { Category } from '@/types/Category';
import { Traveler, TravelersResponse } from '@/types/traveler';

export const clientApi = {
  stories: {
    getAll: async (): Promise<Story[]> => {
      const { data } = await instance.get<Story[]>('/stories');
      return data;
    },
    getPopular: async (): Promise<Story[]> => {
      const res = await instance.get<Story[]>('/stories/popular');
      return res.data;
    },
  },
  categories: {
    getAll: async (): Promise<Category[]> => {
      const { data } = await instance.get<Category[]>('/categories');
      return data;
    },
  },
  travelers: {
    getAll: async (perPage: number = 10, page: number = 1): Promise<Traveler[]> => {
      const { data } = await instance.get<TravelersResponse>('/travelers', {
        params: { perPage, page },
      });
      return data.data.users;
    },
  },
};
