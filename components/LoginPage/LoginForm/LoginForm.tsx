'use client';

import css from './LoginForm.module.css';
import { useRouter } from 'next/navigation';
import { Formik, Form } from 'formik';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { loginSchema } from '@/schemas/authValidation';
import { Input } from '@/components/ui/Input/Input';
import { PasswordInput } from '@/components/ui/PasswordInput/PasswordInput';
import { Button } from '@/components/ui/Button/Button';
import { Loader } from '@/components/ui/Loader/Loader';
import { PageTitle } from '@/components/ui/PageTitle/PageTitle';
import { CustomLink } from '@/components/ui/Link/Link';

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return (
    <section className={css.formCard}>
      <div className={css.tabs}>
        <CustomLink className={css.tab} href="/register" variant="nav">
          Реєстрація
        </CustomLink>
        <div className={`${css.tab} ${css.activeTab}`}>Вхід</div>
      </div>

      <PageTitle className={css.title}>Вхід</PageTitle>
      <p className={css.subtitle}>Вітаємо знову у спільноті мандрівників!</p>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const userData = await login(values);

            setUser(userData);

            toast.success('З поверненням!');

            router.push('/');
            router.refresh();
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              const errorMsg =
                error.response?.data?.message || 'Невірний email або пароль';
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
              {isSubmitting ? <Loader /> : 'Увійти'}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
