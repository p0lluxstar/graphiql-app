'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from '../styles/components/header.module.css';
import LocaleSwitcher from './LocaleSwitcher';
import Logout from './Logout';
import useAuth from '../hooks/useAuth';
import UserAuth from './UserAuth';
import Loader from './Loader';

export default function Header(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const { user, loading } = useAuth();

  return (
    <header className={styles.header}>
      {loading ? (
        <Loader />
      ) : (
        <>
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
              {user && (
                <>
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
                </>
              )}
            </ul>
          </div>
          <div className={styles.accountMenu}>
            <LocaleSwitcher currentLocale={currentLocale} />
            {!user ? <UserAuth currentLocale={currentLocale} /> : <Logout />}
          </div>
        </>
      )}
    </header>
  );
}
