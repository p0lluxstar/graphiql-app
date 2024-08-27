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

export default function Login(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
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
    }
  };

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
