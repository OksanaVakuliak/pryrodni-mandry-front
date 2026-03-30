'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { clientApi } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { registerSchema } from '@/schemas/authValidation';
// import { Input } from '@/components/ui/Input';
// import { PasswordInput } from '@/components/ui/PasswordInput';
import { Loader } from '@/components/ui/Loader/Loader';

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={registerSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const user = await clientApi.register(values);
          setUser(user);
          toast.success('Реєстрація успішна!');
          router.push('/');
          router.refresh();
        } catch (error: any) {
          const message = error.response?.data?.message || 'Помилка реєстрації';
          toast.error(message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <h1>Реєстрація</h1>

          <Input name="name" placeholder="Ім’я" label="Ім’я" />
          <ErrorMessage name="name" component="div" className="error" />

          <Input name="email" type="email" placeholder="Email" label="Email" />
          <ErrorMessage name="email" component="div" className="error" />

          <PasswordInput name="password" placeholder="Пароль" label="Пароль" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader /> : 'Зареєструватися'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
