'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { clientApi, storiesApi } from '@/lib/api/clientApi';
import { Category } from '@/types/Category';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { TextArea } from '@/components/ui/TextArea/TextArea';
import { Select } from '@/components/ui/Select/Select';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import css from './addStoryForm.module.css';
import ErrorWhileSavingModal from '@/components/ui/ErrorWhileSavingModal/ErrorWhileSavingModal';
import { AxiosError } from 'axios';

export default function AddStoryForm() {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const STORAGE_KEY = 'add_story_form';

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file) {
      const newPreview = URL.createObjectURL(file);

      formik.setFieldValue('img', file);
      formik.setFieldTouched('img', true);
      setPreview(newPreview);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    multiple: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await clientApi.categories.getAll();
        setCategories(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(
            error.response?.data?.message || 'Не вдалося завантажити категорії',
          );
        } else {
          toast.error('Непередбачувана помилка. Спробуйте пізніше');
        }
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!preview) return;

    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const getInitialValues = () => {
    if (typeof window === 'undefined') {
      return {
        title: '',
        category: '',
        article: '',
        img: null,
      };
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          img: null,
        };
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            'Не вдалося відновити збережені дані',
        );
      } else {
        toast.error('Не вдалося відновити збережені дані');
      }
    }

    return { title: '', category: '', article: '', img: null };
  };

  const [initialValues] = useState(() => getInitialValues());

  const formik = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Мінімум 3 символи')
        .required('Обовʼязкове поле'),

      category: Yup.string().required('Оберіть категорію'),

      article: Yup.string()
        .min(10, 'Мінімум 10 символів')
        .required('Обовʼязкове поле'),

      img: Yup.mixed().test('fileRequired', 'Додайте зображення', (value) => {
        return value instanceof File;
      }),
    }),

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('category', values.category);
        formData.append('article', values.article);

        if (values.img) {
          formData.append('img', values.img);
        }

        const data = await storiesApi.create(formData);

        router.push(`/stories/${data._id}`);
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status;

          if (status === 401) {
            setIsErrorModalOpen(true);
          } else {
            toast.error(error.response?.data?.message || 'Щось пішло не так');
          }
        } else {
          toast.error('Невідома помилка');
        }
      }
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      const { title, category, article } = formik.values;

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ title, category, article }),
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [formik.values]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={css.wrapper}>
          <div>
            <label className={css.label}>Обкладинка статті</label>

            <div {...getRootProps()}>
              <input {...getInputProps()} ref={fileInputRef} />

              <Image
                className={css.image}
                src={preview || '/Image/Placeholder.webp'}
                alt="preview"
                width={335}
                height={223}
              />
            </div>

            <Button
              className={css.loadImgBtn}
              type="button"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              Завантажити фото
            </Button>
          </div>

          <Input
            label="Заголовок"
            name="title"
            placeholder="Введіть заголовок історії"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.title && typeof formik.errors.title === 'string'
                ? formik.errors.title
                : undefined
            }
          />

          <Select
            label="Категорія"
            options={categories.map((cat) => ({
              value: cat._id,
              label: cat.category,
            }))}
            value={formik.values.category}
            onChange={(value) => {
              formik.setFieldValue('category', value);
              formik.setFieldTouched('category', true, false);
            }}
            error={
              formik.touched.category &&
              typeof formik.errors.category === 'string'
                ? formik.errors.category
                : undefined
            }
            placeholder={
              loadingCategories ? 'Завантаження...' : 'Оберіть категорію'
            }
          />

          <TextArea
            label="Текст історії"
            name="article"
            placeholder="Ваша історія тут"
            value={formik.values.article}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.article &&
              typeof formik.errors.article === 'string'
                ? formik.errors.article
                : undefined
            }
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
              const el = e.currentTarget;

              el.style.height = el.scrollHeight + 'px';
            }}
          />
        </div>
        <div className={css.btnWrapper}>
          <Button
            className={css.btn}
            type="button"
            variant="secondary"
            onClick={() => {
              formik.resetForm({
                values: { title: '', category: '', article: '', img: null },
              });
              setPreview(null);
              localStorage.removeItem(STORAGE_KEY);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Відмінити
          </Button>
          <Button
            className={css.btn}
            type="submit"
            isLoading={formik.isSubmitting}
            disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          >
            Зберегти
          </Button>
        </div>
      </form>
      <ErrorWhileSavingModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        onLogin={() => router.push('/login')}
        onRegister={() => router.push('/register')}
      />
    </div>
  );
}
