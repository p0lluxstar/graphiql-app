'use client';

import styles from '../styles/components/registration.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useRegistrationSchema from '@/hooks/yupRegistrationSchema';
import { FormRegistratonValues } from '@/types/interfaces';
import { useTranslations } from 'next-intl';

export default function Registration(): JSX.Element {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormRegistratonValues>({
    mode: 'onChange',
    resolver: yupResolver(useRegistrationSchema()),
  });

  const onSubmit = (): void => {};

  return (
    <div className={styles.registration}>
      <h1>{t('registration')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <input
            {...register('name')}
            id="name"
            placeholder={t('name')}
            type="text"
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.email}>
          <input
            {...register('email')}
            id="email"
            placeholder={t('email')}
            type="string"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.password}>
          <input
            {...register('password')}
            placeholder={t('password')}
            type="password"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.confirmPassword}>
          <input
            {...register('confirmPassword')}
            placeholder={t('currentPassword')}
            type="password"
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className={styles.btn}>
          <button disabled={!isValid} type="submit">
            {t('registration')}
          </button>
        </div>
      </form>
    </div>
  );
}
