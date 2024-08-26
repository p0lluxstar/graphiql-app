'use client';

import styles from '../styles/components/login.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupLoginSchema from '@/utils/yupLoginSchema';
import { FormLoginValues } from '@/types/interfaces';

export default function Login(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormLoginValues>({
    mode: 'onChange',
    resolver: yupResolver(yupLoginSchema),
  });

  const onSubmit = (): void => {};

  return (
    <div className={styles.login}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.email}>
          <input
            {...register('email')}
            id="email"
            placeholder="Email"
            type="string"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
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
