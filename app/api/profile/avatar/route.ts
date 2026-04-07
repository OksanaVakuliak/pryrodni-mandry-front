import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';

export async function PATCH(req: NextRequest) {
  try {
    const headers = await getAuthHeaders();

    const formData = await req.formData();

    const { data } = await serverApi.patch('/profile/avatar', formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data',
      },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to update avatar' },
      { status: 500 },
    );
  }
}
