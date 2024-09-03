'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import Loader from './Loader';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRouteNoAuth({
  children,
}: ProtectedRouteProps): JSX.Element {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace(`/`);
    }
  }, [user, router]);

  if (loading || user) {
    return <Loader />;
  }

  return children;
}
