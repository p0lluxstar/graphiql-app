'use client';

import styles from '../styles/components/login.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormLoginValues } from '@/types/interfaces';
import { useTranslations } from 'next-intl';
import useLoginSchema from '@/hooks/useLoginSchema';
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../../firebase.config';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormLoginValues>({
    mode: 'onChange',
    resolver: yupResolver(useLoginSchema()),
  });

  const onSubmit = async (data: IFormLoginValues): Promise<void> => {
    const { email, password } = data;
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      router.replace(`/`);
    } catch (error) {
      if (error instanceof Error && 'code' in error) {
        const firebaseError = error as { code: string };

        if (firebaseError.code === 'auth/invalid-credential') {
          setAuthError(t('invalidCredentials'));
        } else if (firebaseError.code === 'auth/too-many-requests') {
          setAuthError(t('tooManyRequests'));
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
    <div className={styles.login} data-testid="login">
      <h1>{t('login')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <div className={styles.btn}>
          <button disabled={!isValid} type="submit">
            {t('login')}
          </button>
          {authError && <p className={styles.errorBtn}>{authError}</p>}
        </div>
      </form>
    </div>
  );
}
