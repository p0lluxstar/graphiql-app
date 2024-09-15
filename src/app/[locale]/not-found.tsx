import { useTranslations } from 'next-intl';

export default function NotFound(): JSX.Element {
  const t = useTranslations();
  return (
    <>
      <p>{t('notFound')}</p>
    </>
  );
}
