import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GraphiqlErrorMessage from '@/components/graphiql/GrahpiqlErrorMessage';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ContextProvider } from '@/context/VisibilityContext';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { grahpiqlErrorMessageActions } from '@/redux/slices/graphiqlErrorMessageSlice';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Component ResponseSection', () => {
  it('Сheck that the element with the test id "responseSection" exists in the DOM', () => {
    (useRouter as vi.Mock).mockReturnValue({
      route: 'en/graphiql',
    });

    store.dispatch(grahpiqlErrorMessageActions.setError('error'));

    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <ContextProvider>
          <Provider store={store}>
            <GraphiqlErrorMessage />
          </Provider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('snackbar')).toBeInTheDocument();
  });
});
