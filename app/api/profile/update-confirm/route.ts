import { NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
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

    const res = await serverApi.post('/profile/update-confirm', {
      token,
    });

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
