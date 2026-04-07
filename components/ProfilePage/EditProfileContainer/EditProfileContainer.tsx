import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import css from './EditProfileContainer.module.css';

export default function EditProfileContainer() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <PageTitle tag="h2" className={css.title}>
          Налаштування профілю
        </PageTitle>
        <EditProfileForm />
      </div>
    </main>
  );
}
