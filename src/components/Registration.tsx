'use client';

import styles from '../styles/components/registration.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useRegistrationSchema from '@/hooks/useRegistrationSchema';
import { IFormRegistratonValues } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import {
  setPersistence,
  createUserWithEmailAndPassword,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Registration(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormRegistratonValues>({
    mode: 'onChange',
    resolver: yupResolver(useRegistrationSchema()),
  });

  const onSubmit = async (data: IFormRegistratonValues): Promise<void> => {
    const { email, password } = data;
    try {
      await setPersistence(auth, browserLocalPersistence);
      await createUserWithEmailAndPassword(auth, email, password);

      router.replace(`/`);
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === 'auth/email-already-in-use') {
          setAuthError(t('invalidUser'));
        } else {
          setAuthError(t('unknownError'));
        }
      } else {
        setAuthError(t('unknownError'));
      }
    }
  };

  const handleInput = (): void => {
    setAuthError(null);
  };

  return (
    <div className={styles.registration} data-testid="registration">
      <h1>{t('registration')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <input
            {...register('name')}
            id="name"
            placeholder={t('name')}
            type="text"
            onInput={handleInput}
          />
          {errors.name && (
            <p className={styles.errorInput}>{errors.name.message}</p>
          )}
        </div>
        <div className={styles.email}>
          <input
            {...register('email')}
            id="email"
            placeholder={t('email')}
            type="string"
            onInput={handleInput}
          />
          {errors.email && (
            <p className={styles.errorInput}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.password}>
          <input
            {...register('password')}
            placeholder={t('password')}
            type="password"
            onInput={handleInput}
          />
          {errors.password && (
            <p className={styles.errorInput}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.confirmPassword}>
          <input
            {...register('confirmPassword')}
            placeholder={t('currentPassword')}
            type="password"
            onInput={handleInput}
          />
          {errors.confirmPassword && (
            <p className={styles.errorInput}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className={styles.btn}>
          <button disabled={!isValid} type="submit">
            {t('registration')}
          </button>
          {authError && <p className={styles.errorBtn}>{authError}</p>}
        </div>
      </form>
    </div>
  );
}
