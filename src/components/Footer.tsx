import { useTranslations } from 'next-intl';
import styles from '../styles/components/footer.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer(): JSX.Element {
  const t = useTranslations();

  return (
    <footer className={styles.footer}>
      <Link className={styles.link} href="https://rs.school/courses/reactjs">
        {t('courseLink')}
      </Link>
      <p>{2024}</p>
      <Image
        width={50}
        height={50}
        src="rss-logo.svg"
        alt="rss-logo"
        className={styles.logo}
      />
    </footer>
  );
}
