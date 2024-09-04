'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from '../styles/pages/main.module.css';
import useAuth from '@/hooks/useAuth';
import Loader from './Loader';

export default function Main(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <>
      {user ? (
        <h3 className={styles.heading}>
          {t('greeting')}, {user.email?.split('@')[0]}
        </h3>
      ) : (
        <h2 className={styles.heading}>{t('welcome')}</h2>
      )}
      <p className={styles.promo}>{t('promo')}</p>

      {user ? (
        <div className={styles.userAuth}>
          <p className={styles.subheading}>{t('continueToWork')}</p>
        </div>
      ) : (
        <div className={styles.userAuth}>
          <h3>{t('singInToContinue')}</h3>
          <ul>
            <li>
              <Link
                href={`/${currentLocale}/login`}
                className={`${styles.userAuthItem} ${pathname === `/${currentLocale}/login` ? styles.active : ''}`}
              >
                {t('login')}
              </Link>
            </li>
            <li>
              <Link
                href={`/${currentLocale}/registration`}
                className={`${styles.userAuthItem} ${pathname === `/${currentLocale}/registration` ? styles.active : ''}`}
              >
                {t('registration')}
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className={styles.description}>
        <div className={styles.boxDesc}>
          {user ? (
            <Link
              href={`/${currentLocale}/restfull`}
              className={`${styles.clientLink} ${pathname === `/${currentLocale}/restfull` ? styles.active : ''}`}
            >
              {t('restClient')}
            </Link>
          ) : (
            <h3>{t('restClient')}</h3>
          )}
          <ul className={styles.listDesc}>
            <li>{t('restClientPlus1')}</li>
            <li>{t('restClientPlus2')}</li>
            <li>{t('restClientPlus3')}</li>
          </ul>
        </div>

        <div className={styles.boxDesc}>
          {user ? (
            <Link
              href={`/${currentLocale}/graphiql`}
              className={`${styles.clientLink} ${pathname === `/${currentLocale}/graphiql` ? styles.active : ''}`}
            >
              {t('graphiqlClient')}
            </Link>
          ) : (
            <h3>{t('graphiqlClient')}</h3>
          )}
          <ul className={styles.listDesc}>
            <li>{t('graphiqlClientPlus1')}</li>
            <li>{t('graphiqlClientPlus2')}</li>
            <li>{t('graphiqlClientPlus3')}</li>
          </ul>
        </div>

        <div className={styles.boxDesc}>
          {user ? (
            <Link
              href={`/${currentLocale}/history`}
              className={`${styles.clientLink} ${pathname === `/${currentLocale}/history` ? styles.active : ''}`}
            >
              {t('history')}
            </Link>
          ) : (
            <h3>{t('history')}</h3>
          )}
          <ul className={styles.listDesc}>
            <li>{t('historyDescription1')}</li>
            <li>{t('historyDescription2')}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
