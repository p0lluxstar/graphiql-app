import Graphiql from '@/components/Graphiql';
import ProtectedRouteAuth from '@/components/ProtectedRouteAuth';

export const metadata = {
  title: 'GraphiQL',
  description: 'Generated by create next app.',
};

export default function GraphiqlPage(): JSX.Element {
  return (
    <>
      <ProtectedRouteAuth>
        <Graphiql />
      </ProtectedRouteAuth>
    </>
  );
}
