import type { Metadata } from 'next';
import Graphiql from '@/components/graphiql/Graphiql';
import ProtectedRouteAuth from '@/components/ProtectedRouteAuth';

export const metadata: Metadata = {
  title: 'Portal | PD',
  description: 'Description portal page',
};

export default function PortalLayout(): JSX.Element {
  return (
    <>
      <ProtectedRouteAuth>
        <Graphiql />
      </ProtectedRouteAuth>
    </>
  );
}
