import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/api/serverApi';
import { ApiError } from '../../api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const storyId = searchParams.get('storyId');
  const categoryId = searchParams.get('categoryId');
  const limit = parseInt(searchParams.get('limit') ?? '3', 10);

  try {
    const { data } = await serverInstance.get('/stories?perPage=100');
    const all = data.stories || data;

    const filtered = Array.isArray(all)
      ? all
          .filter((s: { _id: string; category?: { _id: string } | string }) => {
            if (s._id === storyId) return false;
            if (categoryId) {
              const catId =
                typeof s.category === 'object' ? s.category?._id : s.category;
              return catId === categoryId;
            }
            return true;
          })
          .slice(0, limit)
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
