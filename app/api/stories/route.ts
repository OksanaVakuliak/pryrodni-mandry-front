import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import instance from '@/lib/api/api';
import { ApiError } from '../api';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await instance.get('/stories', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
