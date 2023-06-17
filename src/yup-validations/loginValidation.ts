import * as Yup from 'yup'

export const loginValidations = Yup.object().shape({
   loginEmail: Yup.string()
      .test(
         'email',
         'Email must be valid',
         (value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      )
      .required('Email is required'),

   loginPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(15, 'Password must be exceed 15 characters')
      .required('Password is required')
})