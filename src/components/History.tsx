'use client';

import { LS_KEYS } from '@/utils/const';
import { getLocalStorage } from '@/utils/localStorageService';
import { Typography, Box, List, ListItem } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/components/history.module.css';

export default function History(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const historyData = getLocalStorage(LS_KEYS.HISTORY);

  return (
    <>
      <Typography variant="h3" component="h3" className={styles.heading}>
        {t('history')}
      </Typography>
      {!historyData || historyData?.length === 0 ? (
        <Box>
          <Typography variant="h5" component="h5" className={styles.subheading}>
            {t('emptyHistory')}
          </Typography>
          <List className={styles.list}>
            <ListItem sx={{ width: 'auto' }}>
              <Link
                href={`/${currentLocale}/restfull`}
                className={`${styles.headerMenuItem} ${pathname === `/${currentLocale}/restfull` ? styles.active : ''}`}
              >
                {t('restfull')}
              </Link>
            </ListItem>
            <ListItem sx={{ width: 'auto' }}>
              <Link
                href={`/${currentLocale}/graphiql`}
                className={`${styles.headerMenuItem} ${pathname === `/${currentLocale}/graphiql` ? styles.active : ''}`}
              >
                {t('graphiql')}
              </Link>
            </ListItem>
          </List>
        </Box>
      ) : (
        <p>list of history</p>
      )}
    </>
  );
}
