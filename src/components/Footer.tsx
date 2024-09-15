'use client';

import { useTranslations } from 'next-intl';
import styles from '../styles/components/footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Typography, Box } from '@mui/material';

export default function Footer(): JSX.Element {
  const t = useTranslations();

  return (
    <Box component="footer" className={styles.footer} data-testid="footer">
      <>
        <Link className={styles.link} href="https://rs.school/courses/reactjs">
          {t('courseLink')}
        </Link>
        <Typography component="h6" variant="h6">
          {2024}
        </Typography>
        <Image
          width={50}
          height={50}
          src="/rss-logo.svg"
          alt="rss-logo"
          className={styles.logo}
        />
      </>
    </Box>
  );
}
