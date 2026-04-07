'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useModalStore } from '@/lib/store/useModalStore';
import EditProfileContainer from '@/components/ProfilePage/EditProfileContainer/EditProfileContainer';
import { Modal } from '@/components/ui/Modal/Modal';

export default function EditProfileModal() {
  const router = useRouter();
  const { isEditProfileOpen, closeEditProfile, openEditProfile } =
    useModalStore();

  useEffect(() => {
    openEditProfile();
  }, [openEditProfile]);

  const handleClose = () => {
    closeEditProfile();
    router.push('/profile', { scroll: false });
    router.refresh();
  };

  if (!isEditProfileOpen) return null;

  return (
    <Modal onClose={handleClose}>
      <EditProfileContainer onClose={handleClose} />
    </Modal>
  );
}
