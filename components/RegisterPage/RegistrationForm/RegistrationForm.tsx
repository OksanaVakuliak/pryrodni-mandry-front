'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { clientApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { registerSchema } from '@/schemas/authValidation';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { Loader } from '@/components/ui/Loader/Loader';
import css from './RegistrationForm.module.css';

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return (
    <div className={css.formCard}>
      <div className={css.tabs}>
        <span className={`${css.tab} ${css.activeTab}`}>Реєстрація</span>
        <span className={css.tab} onClick={() => router.push('/login')}>
          Вхід
        </span>
      </div>
      <h1 className={css.title}>Реєстрація</h1>
      <p className={css.subtitle}>Раді вас бачити у спільноті мандрівників!</p>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const userData = await clientApi.register(values);

            setUser(userData);

            toast.success('Вітаємо! Реєстрація успішна.');

            router.push('/');
            router.refresh();
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              const errorMsg =
                error.response?.data?.message || 'Помилка реєстрації';
              toast.error(errorMsg);
            } else {
              toast.error('Сталася непередбачувана помилка');
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            <Input
              name="name"
              label="Ім’я та Прізвище*"
              placeholder="Ваше імʼя та прізвище"
            />

            <Input
              name="email"
              type="email"
              label="Пошта*"
              placeholder="hello@podorozhnyky.ua"
            />

            <PasswordInput
              name="password"
              label="Пароль*"
              placeholder="********"
            />

            <button
              type="submit"
              className={css.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader /> : 'Зареєструватись'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
