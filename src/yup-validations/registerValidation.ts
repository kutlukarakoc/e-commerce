import * as Yup from 'yup'

export const registerValidations = Yup.object().shape({
   registerName: Yup.string()
      .required('Name is required'),

   registerSurname: Yup.string()
      .required('Surname is required'),

   registerEmail: Yup.string()
      .test(
         'email',
         'Email must be valid',
         (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      )
      .required('Email is required'),

   registerPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(15, 'Password must be exceed 15 characters')
      .required('Password is required')
})