import { NextResponse } from 'next/server';
import axios from 'axios';
import { serverApi } from '@/app/api/api';
import { getAuthHeaders } from '@/lib/api/serverApi';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const backendFormData = new FormData();

    const title = formData.get('title');
    const category = formData.get('category');
    const content = formData.get('content');
    const image = formData.get('image') as File | null;

    if (title) backendFormData.append('title', String(title));
    if (category) backendFormData.append('category', String(category));
    if (content) backendFormData.append('content', String(content));
    if (image) backendFormData.append('image', image);

    const headers = await getAuthHeaders();

    const { data } = await serverApi.post('/stories', backendFormData, {
      headers,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data ?? { message: 'Error' };

      return NextResponse.json(message, { status });
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}