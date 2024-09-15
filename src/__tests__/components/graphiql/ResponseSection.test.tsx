import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResponseSection from '@/components/graphiql/ResponseSection';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ContextProvider } from '@/context/VisibilityContext';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { responseSectionActions } from '@/redux/slices/graphiqlResponseSectionSlice';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Component ResponseSection', () => {
  it('Сheck that the element with the test id "responseSection" exists in the DOM', () => {
    (useRouter as vi.Mock).mockReturnValue({
      route: 'en/graphiql',
    });

    store.dispatch(responseSectionActions.setResponseSectionCode('code'));

    const messages = require(`../../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContextProvider>
          <Provider store={store}>
            <ResponseSection />
          </Provider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('responseSection')).toBeInTheDocument();
  });
});
