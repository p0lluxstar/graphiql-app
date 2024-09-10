import React from 'react';
import Restfull from '../../../components/restfull/Restfull';
import ProtectedRouteAuth from '../../../components/ProtectedRouteAuth';

export const metadata = {
  title: 'RESTfull',
  description: 'Generated by create next app.',
};

export default function RestfullPage(): JSX.Element {
  return (
    <>
      <ProtectedRouteAuth>
        <Restfull />
      </ProtectedRouteAuth>
    </>
  );
}
