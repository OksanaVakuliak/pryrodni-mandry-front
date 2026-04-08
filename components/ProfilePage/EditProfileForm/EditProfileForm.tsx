'use client';

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import { Formik, Form, FormikHelpers } from 'formik';
import toast from 'react-hot-toast';
import axios from 'axios';

import css from './EditProfileForm.module.css';

import { Input } from '@/components/ui/Input/Input';
import { PasswordInput } from '@/components/ui/PasswordInput/PasswordInput';
import { Button } from '@/components/ui/Button/Button';
import { Loader } from '@/components/ui/Loader/Loader';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { requestProfileUpdate, updateAvatar, getMe } from '@/lib/api/clientApi';
import { UpdateProfilePayload } from '@/types/updateProfile';
import { profileUpdateSchema } from '@/schemas/profileValidation';
import { User } from '@/types/Users';

interface FormValues {
  name: string;
  password: string;
  confirmPassword: string;
}

export default function EditProfileForm({ onClose }: { onClose?: () => void }) {
  const setUser = useAuthStore((state) => state.setUser);

  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoadingData(true);
        const data = await getMe();
        setUserData(data);
        setAvatarPreview(data.avatarUrl || '');
        setUser(data);
      } catch {
        toast.error('Не вдалося завантажити дані профілю');
      } finally {
        setIsLoadingData(false);
      }
    };

    fetchUser();
  }, [setUser]);

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return toast.error('Файл завеликий (максимум 5MB)');
    }

    const objectUrl = URL.createObjectURL(file);
    setAvatarPreview(objectUrl);

    const formData = new FormData();
    formData.append('avatarUrl', file);

    try {
      setIsUploading(true);
      const data = await updateAvatar(formData);

      if (userData) {
        const updatedUser = { ...userData, avatarUrl: data.avatarUrl };
        setUserData(updatedUser);
        setUser(updatedUser);
      }
      toast.success('Аватар успішно оновлено');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Помилка завантаження фото',
        );
      } else {
        toast.error('Непередбачувана помилка. Спробуйте пізніше');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const payload: UpdateProfilePayload = {};
      const isNameChanged = values.name !== userData?.name;
      const isPasswordChanged = values.password.trim().length > 0;

      if (isNameChanged) payload.name = values.name;
      if (isPasswordChanged) payload.password = values.password;

      if (Object.keys(payload).length === 0) {
        return toast('Ви не змінили жодних даних');
      }

      await requestProfileUpdate(payload);

      if (isNameChanged && isPasswordChanged) {
        toast.success('Ім’я оновлено! Для зміни пароля перевірте пошту.');
      } else if (isNameChanged) {
        toast.success('Ім’я успішно оновлено');
      } else if (isPasswordChanged) {
        toast.success('Запит на зміну пароля надіслано на пошту');
      }

      if (isNameChanged && userData) {
        const updatedUser = { ...userData, name: values.name };
        setUserData(updatedUser);
        setUser(updatedUser);
      }

      resetForm({
        values: {
          name: values.name,
          password: '',
          confirmPassword: '',
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || 'Не вдалося оновити профіль',
        );
      } else {
        toast.error('Непередбачувана помилка. Спробуйте пізніше');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className={css.centerLoader}>
        <Loader />
      </div>
    );
  }

  return (
    <section className={css.card}>
      <div className={css.avatarSection}>
        <button
          type="button"
          className={css.avatarWrapper}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Змінити фото профілю"
        >
          <div
            className={`${css.imageContainer} ${isUploading ? css.uploading : ''}`}
          >
            <Image
              src={avatarPreview || '/default-avatar.png'}
              alt="Аватар"
              fill
              sizes="128px"
              priority
              className={css.image}
              unoptimized={avatarPreview.startsWith('blob:')}
            />
            {isUploading && (
              <div className={css.loaderOverlay}>
                <Loader />
              </div>
            )}
          </div>
          <p className={css.changePhotoText}>Змінити фото</p>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/png, image/jpeg, image/webp"
          />
        </button>
      </div>

      <Formik<FormValues>
        enableReinitialize
        initialValues={{
          name: userData?.name || '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={profileUpdateSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, getFieldProps, touched, errors }) => (
          <Form className={css.form}>
            <Input
              {...getFieldProps('name')}
              label="Ім’я"
              placeholder="Ваше ім'я"
              error={
                touched.name && errors.name
                  ? (errors.name as string)
                  : undefined
              }
            />

            <div className={css.divider} />

            <div className={css.passwordGrid}>
              <PasswordInput
                {...getFieldProps('password')}
                label="Новий пароль"
                placeholder="••••••••"
                autoComplete="new-password"
                error={
                  touched.password && errors.password
                    ? (errors.password as string)
                    : undefined
                }
              />

              <PasswordInput
                {...getFieldProps('confirmPassword')}
                label="Підтвердження"
                placeholder="••••••••"
                autoComplete="new-password"
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? (errors.confirmPassword as string)
                    : undefined
                }
              />
            </div>

            <div className={css.actions}>
              <Button
                type="submit"
                className={css.submitBtn}
                isLoading={isSubmitting}
              >
                Зберегти
              </Button>

              <Button
                type="button"
                className={css.backBtn}
                variant="secondary"
                onClick={onClose}
              >
                Назад
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
