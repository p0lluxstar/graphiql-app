'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import styles from '../styles/pages/main.module.css';
import useAuth from '@/hooks/useAuth';
import Loader from './Loader';
import { Box, List, ListItem, Typography } from '@mui/material';

export default function Main(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const { user, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <Box data-testid="mainPage">
      {user ? (
        <Typography
          variant="h3"
          component="h3"
          className={styles.heading}
          sx={{ mb: 2 }}
        >
          {t('greeting')}, {user.email?.split('@')[0]}
        </Typography>
      ) : (
        <Typography
          variant="h3"
          component="h3"
          className={styles.heading}
          sx={{ mb: 2 }}
        >
          {t('welcome')}
        </Typography>
      )}
      <Typography
        variant="body1"
        component="p"
        sx={{ mb: 3 }}
        className={styles.promo}
      >
        {t('promo')}
      </Typography>
      {user ? (
        <Box className={styles.userAuth}>
          <Typography
            variant="h5"
            component="h5"
            sx={{ mb: 2 }}
            className={styles.subheading}
          >
            {t('continueToWork')}
          </Typography>
        </Box>
      ) : (
        <Box className={styles.userAuth}>
          <Typography variant="h3" component="h3">
            {t('singInToContinue')}
          </Typography>
          <Box className={styles.userAuthBtn}>
            <List>
              <ListItem>
                <Link
                  href={`/${currentLocale}/login`}
                  className={`${styles.userAuthItem} ${pathname === `/${currentLocale}/login` ? styles.active : ''}`}
                >
                  {t('login')}
                </Link>
              </ListItem>
              <ListItem>
                <Link
                  href={`/${currentLocale}/registration`}
                  className={`${styles.userAuthItem} ${pathname === `/${currentLocale}/registration` ? styles.active : ''}`}
                >
                  {t('registration')}
                </Link>
              </ListItem>
            </List>
          </Box>
        </Box>
      )}
      <Box className={styles.description}>
        <Box className={styles.boxDesc}>
          {user ? (
            <Link
              href={`/${currentLocale}/restfull`}
              className={`${styles.clientLink} ${pathname === `/${currentLocale}/restfull` ? styles.active : ''}`}
            >
              {t('restClient')}
            </Link>
          ) : (
            <Typography
              className={styles.clientHeader}
              variant="h5"
              component="h5"
            >
              {t('restClient')}
            </Typography>
          )}
          <List className={styles.listDesc}>
            <ListItem>{t('restClientPlus1')}</ListItem>
            <ListItem>{t('restClientPlus2')}</ListItem>
            <ListItem>{t('restClientPlus3')}</ListItem>
          </List>
        </Box>
        <Box className={styles.boxDesc}>
          {user ? (
            <Link
              href={`/${currentLocale}/graphiql`}
              className={`${styles.clientLink} ${pathname === `/${currentLocale}/graphiql` ? styles.active : ''}`}
            >
              {t('graphiqlClient')}
            </Link>
          ) : (
            <Typography
              className={styles.clientHeader}
              variant="h5"
              component="h5"
            >
              {t('graphiqlClient')}
            </Typography>
          )}
          <List className={styles.listDesc}>
            <ListItem>{t('graphiqlClientPlus1')}</ListItem>
            <ListItem>{t('graphiqlClientPlus2')}</ListItem>
            <ListItem>{t('graphiqlClientPlus3')}</ListItem>
          </List>
        </Box>
        <Box className={styles.boxDesc}>
          {user ? (
            <Link
              href={`/${currentLocale}/history`}
              className={`${styles.clientLink} ${pathname === `/${currentLocale}/history` ? styles.active : ''}`}
            >
              {t('history')}
            </Link>
          ) : (
            <Typography
              className={styles.clientHeader}
              variant="h5"
              component="h5"
            >
              {t('history')}
            </Typography>
          )}
          <List className={styles.listDesc}>
            <ListItem>{t('historyDescription1')}</ListItem>
            <ListItem>{t('historyDescription2')}</ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
}
