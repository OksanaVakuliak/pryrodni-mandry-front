import { NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';

export async function POST() {
  try {
    const headers = await getAuthHeaders();

    await serverApi.post('/auth/logout', {}, { headers });

    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('sessionId');

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return NextResponse.json(
      { message: err.response?.data?.message || 'Logout error' },
      { status: err.response?.status || 500 },
    );
  }
}
