import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.BACKEND_URL;

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};
