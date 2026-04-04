import { serverApi } from '@/app/api/api';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ travellerId: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { travellerId } = await params;

    const { searchParams } = new URL(req.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '6';

    const { data } = await serverApi.get(`/travellers/${travellerId}/stories`, {
      params: {
        page,
        perPage,
      },
    });

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch traveller stories' },
      { status: 500 },
    );
  }
}
