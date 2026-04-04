import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await serverApi.post('/auth/login', body);

    const cookieStore = await cookies();
    const setCookie = res.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        if (parsed.accessToken) {
          cookieStore.set('accessToken', parsed.accessToken);
        }

        if (parsed.refreshToken) {
          cookieStore.set('refreshToken', parsed.refreshToken);
        }

        if (parsed.sessionId) {
          cookieStore.set('sessionId', parsed.sessionId);
        }
      }
    }

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json({ message: 'Login error' }, { status: 500 });
  }
}
