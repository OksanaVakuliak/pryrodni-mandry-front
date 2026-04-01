import { NextResponse } from 'next/server';
import { serverInstance } from '@/lib/api/serverApi';
import { ApiError } from '../../api';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ storyId: string }> },
) {
  const { storyId } = await params;

  try {
    const { data } = await serverInstance.get(`/stories/${storyId}`);
    return NextResponse.json(data);
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
