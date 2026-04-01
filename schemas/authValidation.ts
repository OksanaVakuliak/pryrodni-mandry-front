import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має бути не менше 2 символів")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email('Невірний формат email')
    .required('Email обов’язковий'),
  password: Yup.string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .required('Пароль обов’язковий'),
});
