import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiError, serverApi } from '@/app/api/api';

export async function GET() {
  const cookieStore = await cookies();

  try {
    const { data } = await serverApi.get('/profile/saved-stories', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json({ stories: data.stories || [] });
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
