import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';
import { serverApi } from '@/app/api/api';

export const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};

export const checkServerSession = async (): Promise<AxiosResponse> => {
  const headers = await getAuthHeaders();
  return serverApi.get('/auth/refresh', { headers });
};
