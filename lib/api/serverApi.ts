import { cookies } from 'next/headers';
import axios from 'axios';

export const serverInstance = axios.create({
  baseURL: process.env.BACKEND_URL || 'https://pryrodni-mandry-back.onrender.com/api',
  withCredentials: true,
});

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};

