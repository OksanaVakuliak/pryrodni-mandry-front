import { NextResponse } from 'next/server';
import axios from 'axios';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ storyId: string }> },
) {
  const { storyId } = await params;

  try {
    const headers = await getAuthHeaders();
    const { data } = await serverApi.patch(`/stories/${storyId}/delete`, null, {
      headers,
    });

    return NextResponse.json(data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data ?? { message: 'Error' };
      return NextResponse.json(message, { status });
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
