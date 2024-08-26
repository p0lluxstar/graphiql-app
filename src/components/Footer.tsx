import { useTranslations } from 'next-intl';
import styles from '../styles/components/footer.module.css';

export default function Footer(): JSX.Element {
  const t = useTranslations();

  return (
    <footer className={styles.footer}>
      <h1>{t('footer')}</h1>
    </footer>
  );
}
