import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';
import { isAxiosError } from 'axios';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { status: 400, message: 'Token is required' },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    const parsedCookies = cookieString ? parse(cookieString) : {};

    if (!parsedCookies.accessToken) {
      return NextResponse.json(
        { status: 401, message: 'Missing access token' },
        { status: 401 },
      );
    }

    const headers = await getAuthHeaders();

    const res = await serverApi.post(
      '/profile/update-confirm',
      { token },
      { headers },
    );

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
