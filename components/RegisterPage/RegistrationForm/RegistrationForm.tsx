'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { register } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { registerSchema } from '@/schemas/authValidation';
import { Input } from '@/components/ui/Input/Input';
import { PasswordInput } from '@/components/ui/PasswordInput/PasswordInput';
import { Button } from '@/components/ui/Button/Button';
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
            const userData = await register(values);

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
        {({ isSubmitting, getFieldProps, touched, errors }) => (
          <Form className={css.form}>
            <Input
              {...getFieldProps('name')}
              label="Ім’я та Прізвище*"
              placeholder="Ваше імʼя та прізвище"
              error={touched.name && errors.name ? errors.name : undefined}
            />

            <Input
              {...getFieldProps('email')}
              type="email"
              label="Пошта*"
              placeholder="hello@podorozhnyky.ua"
              error={touched.email && errors.email ? errors.email : undefined}
            />

            <PasswordInput
              {...getFieldProps('password')}
              label="Пароль*"
              placeholder="********"
              error={
                touched.password && errors.password
                  ? errors.password
                  : undefined
              }
            />

            <Button
              type="submit"
              className={css.submitBtn}
              isLoading={isSubmitting}
            >
              {isSubmitting ? <Loader /> : 'Зареєструватись'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
