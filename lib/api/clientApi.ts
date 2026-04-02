import instance from './api';
import { Category } from '@/types/Category';
import { Traveler, TravelersResponse } from '@/types/traveler';
import { User } from '@/types/Users';
import { SaveResponse, Story } from '@/types/story';
import { Traveller, TravellersResponse } from '@/types/traveller';

export interface AuthRequest {
  email: string;
  password: string;
}

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

export const register = async (credentials: AuthRequest): Promise<User> => {
  const res = await instance.post<User>('/auth/register', credentials);
  return res.data;
};

export const login = async (credentials: AuthRequest): Promise<User> => {
  const res = await instance.post<User>('/auth/login', credentials);
  return res.data;
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

  return data.users;
};

export const storiesApi = {
  saveStory: async (storyId: string): Promise<SaveResponse> => {
    const response = await instance.patch<SaveResponse>(
      `/stories/${storyId}/save`,
    );
    return response.data;
  },
  deleteStory: async (storyId: string): Promise<SaveResponse> => {
    const response = await instance.patch<SaveResponse>(
      `/stories/${storyId}/delete`,
    );
    return response.data;
  },
};
