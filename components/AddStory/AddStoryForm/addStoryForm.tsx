'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import instance from '@/lib/api/api';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { clientApi } from '@/lib/api/clientApi';
import { Category } from '@/types/Category';
import { serverApi } from '@/app/api/api';


export default function CreateStoryForm() {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // 🔽 Отримання категорій
  useEffect(() => {
    const fetchCategories = async () => {
  try {
    const data = await serverApi.categories.getAll();
    setCategories(data);
  } catch (error) {
    console.error('Не вдалося завантажити категорії', error);
  } finally {
    setLoadingCategories(false);
  }
};
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      category: '',
      content: '',
      image: null as File | null,
    },

    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Мінімум 3 символи')
        .required('Обовʼязкове поле'),

      category: Yup.string().required('Оберіть категорію'),

      content: Yup.string()
        .min(10, 'Мінімум 10 символів')
        .required('Обовʼязкове поле'),

      image: Yup.mixed().required('Додайте зображення'),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();

        formData.append('title', values.title);
        formData.append('category', values.category); // або categoryId
        formData.append('content', values.content);

        if (values.image) {
          formData.append('image', values.image);
        }

        const { data } = await clientApi.stories.create(formData);

        router.push(`/articles/${data.id}`);
      } catch (error) {
        console.error(error);
        alert('Помилка при створенні історії');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      
      {/* 🖼️ Обкладинка */}
      <div>
        <p>Обкладинка статті</p>

        <div>
          <Image
            src={preview || '/Image/placeholder.png'}
            alt="preview"
            width={1090}
            height={726}
          />
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files?.[0];
            if (file) {
              formik.setFieldValue('image', file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {formik.touched.image && formik.errors.image && (
          <div style={{ color: 'red' }}>{formik.errors.image}</div>
        )}
      </div>

      {/* 📝 Заголовок */}
      <div>
        <p>Заголовок</p>
        <input
          name="title"
          placeholder="Введіть заголовок історії"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />

        {formik.touched.title && formik.errors.title && (
          <div style={{ color: 'red' }}>{formik.errors.title}</div>
        )}
      </div>

      {/* 📂 Категорія */}
      <div>
        <p>Категорія</p>

        <select
          name="category"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          disabled={loadingCategories}
        >
          <option value="">
            {loadingCategories ? 'Завантаження...' : 'Оберіть категорію'}
          </option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.category}
            </option>
          ))}
        </select>

        {formik.touched.category && formik.errors.category && (
          <div style={{ color: 'red' }}>{formik.errors.category}</div>
        )}
      </div>

      {/* 📖 Текст */}
      <div>
        <p>Текст історії</p>

        <textarea
          name="content"
          placeholder="Ваша історія тут"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.content}
        />

        {formik.touched.content && formik.errors.content && (
          <div style={{ color: 'red' }}>{formik.errors.content}</div>
        )}
      </div>

      {/* 🔘 Кнопки */}
      <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
        
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Збереження...' : 'Зберегти'}
        </button>

        <button
          type="button"
          onClick={() => {
            formik.resetForm();
            setPreview(null);
          }}
        >
          Відмінити
        </button>
      </div>
    </form>
  );
}