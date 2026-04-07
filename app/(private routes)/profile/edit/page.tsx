import EditProfileContainer from '@/components/ProfilePage/EditProfileContainer/EditProfileContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Редагування профілю | Природні Мандри',
  description:
    'Оновіть свою персональну інформацію, змініть аватар або пароль.',
};

export default function EditProfilePage() {
  return <EditProfileContainer />;
}
