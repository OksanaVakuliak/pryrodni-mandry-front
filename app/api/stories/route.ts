import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ApiError, serverApi } from '../api';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);

  if (!searchParams.has('perPage')) searchParams.set('perPage', '100');

  const queryString = searchParams.toString();

  try {
    const { data } = await serverApi.get(
      `/stories${queryString ? `?${queryString}` : ''}`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return NextResponse.json(data.stories || data);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data ?? (error as ApiError).message,
      },
      { status: (error as ApiError).response?.status || 500 },
    );
  }
}
