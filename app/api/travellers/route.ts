import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';

export async function GET(req: NextRequest) {
  try {
    const headers = await getAuthHeaders();

    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page');
    const perPage = searchParams.get('perPage');

    const { data } = await serverApi.get('/travellers', {
      headers,
      params: {
        page,
        perPage,
      },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch travellers' },
      { status: 500 },
    );
  }
}
