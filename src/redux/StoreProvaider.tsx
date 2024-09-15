'use client';

import { Provider } from 'react-redux';
import store from './store';

export default function StoreProvaider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <Provider store={store}>{children}</Provider>;
}
