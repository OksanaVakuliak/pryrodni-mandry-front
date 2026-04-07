'use client';
import { useRouter } from 'next/navigation';
import EditProfileContainer from '@/components/ProfilePage/EditProfileContainer/EditProfileContainer';
import { Modal } from '@/components/ui/Modal/Modal';

export default function EditProfileModal() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <EditProfileContainer onClose={() => router.back()} />
    </Modal>
  );
}
