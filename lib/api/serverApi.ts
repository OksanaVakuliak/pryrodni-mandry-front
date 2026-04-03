import { Traveller } from '@/types/traveller';
import { cookies } from 'next/headers';
import instance from './api';
import { AxiosResponse } from 'axios';
import { serverApi } from '@/app/api/api';

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
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

export const checkServerSession = async (): Promise<AxiosResponse> => {
  const headers = await getAuthHeaders();
  return serverApi.get('/auth/refresh', { headers });
};
