'use client';

import styles from '../styles/components/login.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLoginValues } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import useLoginSchema from '@/hooks/useLoginSchema';

export default function Login(): JSX.Element {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormLoginValues>({
    mode: 'onChange',
    resolver: yupResolver(useLoginSchema()),
  });

  const onSubmit = (): void => {};

  return (
    <div className={styles.login}>
      <h1>{t('login')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <div className={styles.btn}>
          <button disabled={!isValid} type="submit">
            {t('login')}
          </button>
        </div>
      </form>
    </div>
  );
}
