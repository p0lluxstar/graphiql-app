'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from '../styles/pages/main.module.css';

export default function Main(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  return (
    <>
      <h2 className={styles.heading}>{t('welcome')}</h2>
      <p className={styles.promo}>{t('promo')}</p>

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

      <div className={styles.description}>
        <div className={styles.boxDesc}>
          <h3>{t('restClient')}</h3>
          <ul className={styles.listDesc}>
            <li>{t('restClientPlus1')}</li>
            <li>{t('restClientPlus2')}</li>
            <li>{t('restClientPlus3')}</li>
          </ul>
        </div>

        <div className={styles.boxDesc}>
          <h3>{t('graphiqlClient')}</h3>
          <ul className={styles.listDesc}>
            <li>{t('graphiqlClientPlus1')}</li>
            <li>{t('graphiqlClientPlus2')}</li>
            <li>{t('graphiqlClientPlus3')}</li>
          </ul>
        </div>
      </div>
    </>
  );
}
