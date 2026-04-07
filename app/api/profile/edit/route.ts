import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';

export async function POST(req: NextRequest) {
  try {
    const headers = await getAuthHeaders();
    const body = await req.json();

    const { data } = await serverApi.post('/profile/update-request', body, {
      headers,
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to update profile' },
      { status: 500 },
    );
  }
}
