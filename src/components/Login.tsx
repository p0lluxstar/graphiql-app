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
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

export default function Login(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
  const { user, loading } = useAuth();
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // eslint-disable-next-line no-console
      console.log('User signed in:', userCredential.user);
      router.replace(`/`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error signing in:', error);
      setAuthError(t('invalidCredentials'));
    }
  };

  const handleInput = (): void => {
    setAuthError(null);
  };

  if (user) {
    router.replace(`/`);
    return <></>;
  }

  return (
    <div className={styles.login}>
      {loading ? (
        <Loader />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
