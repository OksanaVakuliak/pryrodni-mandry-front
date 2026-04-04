import { NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';

const handleRefresh = async () => {
  try {
    const cookieStore = await cookies();
    const cookieString = cookieStore.toString();
    const parsed = cookieString ? parse(cookieString) : {};

    if (!parsed.refreshToken || !parsed.sessionId) {
      return NextResponse.json(
        { status: 401, message: 'Missing refresh token or session id' },
        { status: 401 },
      );
    }

    const headers = cookieString ? { Cookie: cookieString } : {};

    const res = await serverApi.post('/auth/refresh', {}, { headers });

    const setCookie = res.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsedCookie = parse(cookieStr);

        if (parsedCookie.accessToken) {
          cookieStore.set('accessToken', parsedCookie.accessToken);
        }

        if (parsedCookie.refreshToken) {
          cookieStore.set('refreshToken', parsedCookie.refreshToken);
        }

        if (parsedCookie.sessionId) {
          cookieStore.set('sessionId', parsedCookie.sessionId);
        }
      }
    }

    return NextResponse.json({ message: 'Session refreshed' }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Refresh error';

      return NextResponse.json({ status, message }, { status });
    }

    return NextResponse.json(
      { status: 500, message: 'Refresh error' },
      { status: 500 },
    );
  }
};

export async function POST() {
  return handleRefresh();
}
