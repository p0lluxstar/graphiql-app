'use client';

import styles from '../styles/components/registration.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import yupRegistratonSchema from '@/utils/yupRegistrationSchema';
import { FormRegistratonValues } from '@/types/interfaces';

export default function Registration(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormRegistratonValues>({
    mode: 'onChange',
    resolver: yupResolver(yupRegistratonSchema),
  });

  const onSubmit = (): void => {};

  return (
    <div className={styles.registration}>
      <h1>Registration</h1>
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
        <div className={styles.confirmPassword}>
          <input
            {...register('confirmPassword')}
            placeholder="Confirm password"
            type="password"
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className={styles.btn}>
          <button disabled={!isValid} type="submit">
            Registration
          </button>
        </div>
      </form>
    </div>
  );
}
