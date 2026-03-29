import { NextResponse } from 'next/server';
import { serverApi } from '@/lib/api/serverApi';

export async function GET() {
  try {
    const { data } = await serverApi.get('/stories/popular');

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch stories' },
      { status: 500 },
    );
  }
}
