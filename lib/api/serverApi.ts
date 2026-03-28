import { cookies } from 'next/headers';

export const getAuthHeaders = async () => {
  const cookieStore = cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};
