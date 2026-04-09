import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiError, serverApi } from '@/app/api/api';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('perPage') || '6';

  try {
    const { data } = await serverApi.get('/profile/saved-stories', {
      params: { page, perPage },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data ?? (error as ApiError).message,
      },
      { status: (error as ApiError).response?.status || 500 },
    );
  }
}
