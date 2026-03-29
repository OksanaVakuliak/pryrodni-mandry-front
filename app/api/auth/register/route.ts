import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/lib/api/serverApi';
import { AxiosError } from 'axios';
import { RegisterBody } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: RegisterBody = await req.json();

    const { data } = await serverApi.post('/auth/register', body);

    return NextResponse.json(data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return NextResponse.json(
      { message: err.response?.data?.message || 'Register error' },
      { status: err.response?.status || 500 },
    );
  }
}
