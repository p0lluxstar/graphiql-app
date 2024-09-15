import Graphiql from '@/components/graphiql/Graphiql';
import ProtectedRouteAuth from '@/components/ProtectedRouteAuth';

export default function PortalLayout(): JSX.Element {
  return (
    <>
      <ProtectedRouteAuth>
        <Graphiql />
      </ProtectedRouteAuth>
    </>
  );
}
