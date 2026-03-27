import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

//  Клиентский axios
export const clientApi = axios.create({
  baseURL,
  withCredentials: true,
});

//  Серверный axios
export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});

// Cookie для SSR запросов
export const getAuthHeaders = async () => {
  const cookieStore = cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};
