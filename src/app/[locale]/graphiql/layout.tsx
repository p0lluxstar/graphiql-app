import type { Metadata } from 'next';
import Graphiql from '@/components/Graphiql';

export const metadata: Metadata = {
  title: 'Portal | PD',
  description: 'Description portal page',
};

export default function PortalLayout(): JSX.Element {
  return (
    <>
      <Graphiql />
    </>
  );
}
