import { Traveller } from '@/types/traveller';
import { cookies } from 'next/headers';
import instance from './api';
import { AxiosResponse } from 'axios';
import { serverApi } from '@/app/api/api';
import { Story } from '@/types/story';

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};

export const checkServerSession = async (): Promise<AxiosResponse> => {
  const headers = await getAuthHeaders();
  return serverApi.post('/auth/refresh', {}, { headers });
};

export const getTravellerByIdServer = async (
  id: string,
): Promise<Traveller> => {
  const headers = await getAuthHeaders();
  const { data } = await instance.get<Traveller>(`/travellers/${id}`, {
    headers,
  });
  return data;
};

export const getStory = async (id: string): Promise<Story | null> => {
  const { data } = await instance.get<Story>(`/stories/${id}`);
  return data;
};
