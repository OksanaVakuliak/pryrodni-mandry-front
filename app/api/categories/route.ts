import { NextResponse } from 'next/server';
import { ApiError } from '../api';
import { serverInstance } from '@/lib/api/serverApi';

export async function GET() {
  try {
    const { data } = await serverInstance.get('/categories');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status || 500 },
    );
  }
}