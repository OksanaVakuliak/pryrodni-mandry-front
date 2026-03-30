import instance from './api';
import { Story } from '@/types/Stories';

export const clientApi = {
  stories: {
    getAll: async () => {
      const { data } = await instance.get<Story[]>('/stories');
      return data;
    },
  },
};
