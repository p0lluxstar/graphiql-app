'use client';

import { useTranslations } from 'next-intl';

export default function Graphiql(): JSX.Element {
  const t = useTranslations();

  return (
    <>
      <h1>{t('graphiql')}</h1>
    </>
  );
}
