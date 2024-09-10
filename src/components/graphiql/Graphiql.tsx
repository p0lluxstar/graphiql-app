'use client';

import GraphiqlLayout from './GraphiqlLayout';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader';
import { useRouter } from 'next/navigation';
import GraphiqlErrorMessage from './GrahpiqlErrorMessage';

export default function Graphiql(): JSX.Element {
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
      <GraphiqlLayout />
      <GraphiqlErrorMessage />
    </>
  );
}
