import * as yup from 'yup';

const yupRegistratonSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Name must contain only Latin letters and numbers'
    )
    .min(3, 'Name must be at least 3 characters long'),
  email: yup
    .string()
    .required('The email is required')
    .email('The email must contain the "@" and the domain name'),
  password: yup
    .string()
    .required('The password is required.')
    .matches(/[A-Z]/, 'The password must contain at least one capital letter')
    .matches(/[a-z]/, 'The password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'The password must contain at least one digit')
    .matches(
      /[!@#$%^&*()_+]/,
      'The password must contain at least one special symbol'
    )
    .min(8, 'The password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export default yupRegistratonSchema;
