import { Story } from '@/types/story';
import instance from './api';

export const getPopularStories = async () => {
  const res = await instance.get<Story[]>('/stories/popular');
  return res.data;
};
