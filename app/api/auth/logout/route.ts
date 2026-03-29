import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete('token');

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ message: 'Logout error' }, { status: 500 });
  }
}
