import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import QuerySection from '@/components/graphiql/QuerySection';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';
import { useRouter } from 'next/navigation';
import { ContextProvider } from '@/context/VisibilityContext';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Component QuerySection', () => {
  it('Сheck that the element with the test id "querySection" exists in the DOM', () => {
    (useRouter as vi.Mock).mockReturnValue({
      route: 'en/graphiql',
    });

    const messages = require(`../../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContextProvider>
          <StoreProvaider>
            <QuerySection />
          </StoreProvaider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('querySection')).toBeInTheDocument();
  });
});
