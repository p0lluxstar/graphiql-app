'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRouteAuth({
  children,
}: ProtectedRouteProps): JSX.Element {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/`);
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loader />;
  }

  return children;
}
