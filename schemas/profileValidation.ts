import * as Yup from 'yup';

export const profileUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Ім’я має містити мінімум 2 символи')
    .max(50, 'Ім’я занадто довге'),

  password: Yup.string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(128, 'Пароль занадто довгий'),

  confirmPassword: Yup.string().when('password', {
    is: (val: string) => val && val.length > 0,
    then: (schema) =>
      schema
        .required('Будь ласка, підтвердіть пароль')
        .oneOf([Yup.ref('password')], 'Паролі повинні збігатися'),
    otherwise: (schema) => schema.notRequired(),
  }),
});
