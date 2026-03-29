import { NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';

export async function GET() {
  try {
    const headers = await getAuthHeaders();

    const { data } = await serverApi.get('/travellers', { headers });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch travellers' },
      { status: 500 },
    );
  }
}
