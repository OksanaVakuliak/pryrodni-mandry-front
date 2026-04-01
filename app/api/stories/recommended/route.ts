import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/api/serverApi';
import { ApiError } from '../../api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storyId = searchParams.get('storyId');

  try {
    const { data } = await serverInstance.get('/stories?perPage=100');
    const all = data.stories || data;

    const filtered = Array.isArray(all)
      ? all.filter((s: { _id: string }) => s._id !== storyId).slice(0, 3)
      : [];

    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).response?.status || 500 },
    );
  }
}
