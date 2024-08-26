'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styles from '../styles/components/localeSwitcher.module.css';

export default function LocaleSwitcher({
  currentLocale,
}: {
  currentLocale: string;
}): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const otherLocale = currentLocale === 'en' ? 'ru' : 'en';

  const handleLocaleChange = (): void => {
    const newPath = `/${otherLocale}${pathname.substring(3)}`;
    router.push(
      newPath + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    );
  };

  return (
    <button className={styles.localeButton} onClick={handleLocaleChange}>
      {otherLocale.toUpperCase()}
    </button>
  );
}
