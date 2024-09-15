'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from '../styles/components/header.module.css';
import LocaleSwitcher from './LocaleSwitcher';
import Logout from './Logout';
import useAuth from '../hooks/useAuth';
import UserAuth from './UserAuth';
import { List, Box, ListItem } from '@mui/material';

export default function Header(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const { user, loading } = useAuth();

  return (
    <Box component="header" className={styles.header} data-testid="header">
      {loading ? null : (
        <>
          <Box component="nav" className={styles.mainMenu}>
            <List>
              <ListItem>
                <Link
                  href={`/${currentLocale}`}
                  className={`${styles.headerMenuItem} ${pathname === `/${currentLocale}` ? styles.active : ''}`}
                >
                  {t('main')}
                </Link>
              </ListItem>
              {user && (
                <>
                  <ListItem>
                    <Link
                      href={`/${currentLocale}/restfull`}
                      className={`${styles.headerMenuItem} ${pathname.startsWith(`/${currentLocale}/restfull`) ? styles.active : ''}`}
                    >
                      {t('restfull')}
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href={`/${currentLocale}/graphiql`}
                      className={`${styles.headerMenuItem} ${pathname.startsWith(`/${currentLocale}/graphiql`) ? styles.active : ''}`}
                    >
                      {t('graphiql')}
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Link
                      href={`/${currentLocale}/history`}
                      className={`${styles.headerMenuItem} ${pathname.startsWith(`/${currentLocale}/history`) ? styles.active : ''}`}
                    >
                      {t('history')}
                    </Link>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
          <Box className={styles.accountMenu}>
            <LocaleSwitcher currentLocale={currentLocale} />
            {!user ? <UserAuth currentLocale={currentLocale} /> : <Logout />}
          </Box>
        </>
      )}
    </Box>
  );
}
