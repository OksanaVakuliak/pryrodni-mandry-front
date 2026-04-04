import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';

export async function GET() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const parsedCookies = cookieString ? parse(cookieString) : {};

  if (!parsedCookies.accessToken) {
    return NextResponse.json(
      { status: 401, message: 'Missing access token' },
      { status: 401 },
    );
  }

  try {
    const headers = await getAuthHeaders();

    const res = await serverApi.get('/profile/me', { headers });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Server error';

      return NextResponse.json({ status, message }, { status });
    }

    return NextResponse.json(
      { status: 500, message: 'Server error' },
      { status: 500 },
    );
  }
}
