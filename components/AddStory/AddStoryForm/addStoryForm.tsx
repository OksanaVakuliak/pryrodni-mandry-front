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

export default function CreateStoryForm() {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  
  const onDrop = (acceptedFiles: File[]) => {
  const file = acceptedFiles[0];

  if (file) {
    formik.setFieldValue('image', file);
    formik.setFieldTouched('image', true);
    setPreview(URL.createObjectURL(file));
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
    console.error('Не вдалося завантажити категорії', error);
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

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      content: '',
      image: null as File | null,
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Мінімум 3 символи')
        .required('Обовʼязкове поле'),

      category: Yup.string().required('Оберіть категорію'),

      content: Yup.string()
        .min(10, 'Мінімум 10 символів')
        .required('Обовʼязкове поле'),

      image: Yup.mixed().test('fileRequired', 'Додайте зображення', (value) => {
    return value instanceof File;
  }),
    }),

    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('category', values.category);
        formData.append('content', values.content);

        if (values.image) {
          formData.append('image', values.image);
        }

        const data = await storiesApi.create(formData);

        router.push(`/stories/${data._id}`);
      } catch (error) {
  if (error instanceof AxiosError) {
    const status = error.response?.status;

    if (status === 401) {
      setIsErrorModalOpen(true);
    } else {
      toast.error(
        error.response?.data?.message || 'Щось пішло не так'
      );
    }
  } else {
    toast.error('Невідома помилка');
  }
}
    },
  });

    return (
        <div className='container'>
            <form onSubmit={formik.handleSubmit}>
                <div className={css.wrapper}>
            <div>
                <label className={css.label}>Обкладинка статті</label>

                <div {...getRootProps()}>
                    <input {...getInputProps()} ref={fileInputRef}/>

                    <Image
                        className={css.image}
                        src={preview || '/Image/placeholder.png'}
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
                error={formik.touched.title ? formik.errors.title : undefined}
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
                formik.touched.category ? formik.errors.category : undefined
            }
            placeholder={loadingCategories ? 'Завантаження...' : 'Оберіть категорію'}
        />
                
        <TextArea
            label="Текст історії"
            name="content"
            placeholder="Ваша історія тут"
            value={formik.values.content}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.content ? formik.errors.content : undefined}
            onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
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
                formik.resetForm();
                setPreview(null);
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
            disabled={!formik.isValid && !formik.dirty}
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