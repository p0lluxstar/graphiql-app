'use client';

import { LS_KEYS } from '@/utils/const';
import { getLocalStorage } from '@/utils/localStorageService';
import { Typography, Box, List, ListItem } from '@mui/material';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/components/history.module.css';
import { removeLocalStorage } from '@/utils/localStorageService';
import { useState } from 'react';

interface IItemHistory {
  client: string;
  url: string;
}

export default function History(): JSX.Element {
  const t = useTranslations();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1];
  const [historyData, setHistoryData] = useState<IItemHistory[]>(
    () => getLocalStorage(LS_KEYS.HISTORY) || []
  );

  const handleClearHistoryBtn = (): void => {
    removeLocalStorage('LS_HISTORY');
    setHistoryData([]);
  };

  return (
    <Box data-testid="history">
      <Typography variant="h1" component="h1" className={styles.heading}>
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
        <Box className={styles.historyTable}>
          <Box className={styles.historyItems}>
            {historyData.map((el: IItemHistory, index: number) => (
              <p key={index} className={styles.historyItem}>
                {`${el.client}: `}
                <Link className={styles.historyLink} href={el.url}>
                  {el.url}
                </Link>
              </p>
            ))}
          </Box>
          <Box className={styles.clearHistoryBtnWrapper}>
            <button
              className={styles.clearHistoryBtn}
              onClick={handleClearHistoryBtn}
            >
              Clear history
            </button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
