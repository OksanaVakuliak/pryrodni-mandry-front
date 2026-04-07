import * as Yup from 'yup';

export const profileUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Ім’я має містити мінімум 2 символи')
    .max(50, 'Ім’я занадто довге'),

  password: Yup.string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .matches(/[a-zA-Z]/, 'Пароль повинен містити хоча б одну літеру'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі повинні збігатися')
    .when('password', {
      is: (val: string) => val && val.length > 0,
      then: (schema) => schema.required('Будь ласка, підтвердіть пароль'),
      otherwise: (schema) => schema.notRequired(),
    }),
});
