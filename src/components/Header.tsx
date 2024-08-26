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
      <ul className={styles.headerMenu}>
        <li>
          <Link
            href={`/${currentLocale}/`}
            className={`${styles.headerMenuItem} ${pathname === `/${currentLocale}/` ? styles.active : ''}`}
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
      <div>
        <Link href="/login">Login</Link>
        <Link href="/registration">Registration</Link>
      </div>
      <LocaleSwitcher currentLocale={currentLocale} />
    </header>
  );
}
