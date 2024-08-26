import { useTranslations } from 'next-intl';

export default function Main(): JSX.Element {
  const t = useTranslations();

  return (
    <>
      <h1>{t('main')}</h1>
    </>
  );
}
