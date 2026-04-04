import { NextRequest, NextResponse } from 'next/server';
import { serverApi } from '../../api';

interface RouteParams {
  params: Promise<{ travellerId: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { travellerId } = await params;

    const { data } = await serverApi.get(`/travellers/${travellerId}`);

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: 'Failed to fetch traveller' },
      { status: 500 },
    );
  }
}
