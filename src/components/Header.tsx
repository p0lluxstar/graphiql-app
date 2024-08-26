'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from '../styles/components/header.module.css';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];

  return (
    <header className={styles.header}>
      <div className={styles.mainMenu}>
        <ul>
          <li>
            <Link
              href={`/${currentLocale}`}
              className={`${styles.headerMenuItem} ${pathname === `/${currentLocale}` ? styles.active : ''}`}
            >
              {t('main')}
            </Link>
          </li>
          <li>
            <Link
              href={`/${currentLocale}/restfull`}
              className={`${styles.headerMenuItem} ${pathname === `/${currentLocale}/restfull` ? styles.active : ''}`}
            >
              {t('restfull')}
            </Link>
          </li>
          <li>
            <Link
              href={`/${currentLocale}/graphiql`}
              className={`${styles.headerMenuItem} ${pathname === `/${currentLocale}/graphiql` ? styles.active : ''}`}
            >
              {t('graphiql')}
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.accountMenu}>
        <LocaleSwitcher currentLocale={currentLocale} />
        <div className={styles.userAuth}>
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
      </div>
    </header>
  );
}
