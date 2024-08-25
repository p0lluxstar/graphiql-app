import * as yup from 'yup';

const yupSchema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Name must contain only Latin letters and numbers'
    )
    .min(3, 'Name must be at least 3 characters long')
    .required('Name is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

export default yupSchema;
