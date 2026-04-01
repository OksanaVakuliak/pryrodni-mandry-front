import instance from './api';
import { Story } from '@/types/Stories';
import { Category } from '@/types/Category';

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
