import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await serverApi.post('/auth/register', body);

    const loginRes = await serverApi.post('/auth/login', {
      email: body.email,
      password: body.password,
    });

    const cookieStore = await cookies();
    const setCookie = loginRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        if (parsed.refreshToken) {
          cookieStore.set('refreshToken', parsed.refreshToken);
        }

        if (parsed.accessToken) {
          cookieStore.set('accessToken', parsed.accessToken);
        }
      }
    } else {
      console.log('set-cookie не пришёл');
    }

    return NextResponse.json(loginRes.data);
  } catch (error) {
    console.log('REGISTER ERROR:', error);

    return NextResponse.json({ message: 'Register error' }, { status: 500 });
  }
}
