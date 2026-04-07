'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

type Props = {
  error: string | null;
};

export default function StoriesErrorClient({ error }: Props) {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return null;
}
