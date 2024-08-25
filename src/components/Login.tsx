'use client';

import { useForm } from 'react-hook-form';
import styles from '../styles/components/login.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import yupSchema from '@/utils/yupSchema';

interface FormValues {
  name: string;
  password: string;
}

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(yupSchema),
  });

  const onSubmit = (): void => {};

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <input
            {...register('name')}
            id="name"
            placeholder="Name"
            type="text"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.password}>
          <input
            {...register('password')}
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.btn}>
          <button disabled={!isValid} type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
