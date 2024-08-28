'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';
import { useRouter } from 'next/navigation';

export default function Graphiql(): JSX.Element {
  const t = useTranslations();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  return (
    <>
      <h1>{t('graphiql')}</h1>
    </>
  );
}
