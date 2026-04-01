import { cookies } from 'next/headers';

export const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();

  return cookieString ? { Cookie: cookieString } : {};
};
