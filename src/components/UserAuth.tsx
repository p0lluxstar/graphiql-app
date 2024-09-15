import { usePathname } from 'next/navigation';
import styles from '../styles/components/header.module.css';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function UserAuth({
  currentLocale,
}: {
  currentLocale: string;
}): JSX.Element {
  const pathname = usePathname();
  const t = useTranslations();
  return (
    <div className={styles.userAuth} data-testid="userAuth">
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
  );
}
