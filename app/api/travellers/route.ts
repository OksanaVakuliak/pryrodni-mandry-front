import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/travellers`);

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
