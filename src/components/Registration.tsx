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

export default function Registration(): JSX.Element {
  const t = useTranslations();
  const router = useRouter();
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
      const userCredential = await createUserWithEmailAndPassword(
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
    <div className={styles.registration}>
      <h1>{t('registration')}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <input
            {...register('name')}
            id="name"
            placeholder={t('name')}
            type="text"
            value="Jonh"
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
            value="Q1w2e3r4!"
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
            value="Q1w2e3r4!"
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
