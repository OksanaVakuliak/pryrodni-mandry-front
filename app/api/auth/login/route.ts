import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { AxiosError } from 'axios';
import { LoginBody } from '@/types/auth';

export async function POST(req: NextRequest) {
  try {
    const body: LoginBody = await req.json();

    const { data } = await serverApi.post('/auth/login', body);

    return NextResponse.json(data);
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    return NextResponse.json(
      { message: err.response?.data?.message || 'Login error' },
      { status: err.response?.status || 500 },
    );
  }
}
