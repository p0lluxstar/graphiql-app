import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainControls from '@/components/graphiql/MainControls';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';
import { useRouter } from 'next/navigation';
import { ContextProvider } from '@/context/VisibilityContext';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Component MainControls', () => {
  it('Сheck that the element with the test id "mainControls2" exists in the DOM', () => {
    (useRouter as vi.Mock).mockReturnValue({
      route:
        'en/graphiql/aHR0cHM6Ly9yaWNrYW5kbW9ydHlhcGkuY29tL2dyYXBocWw=/eyJxdWVyeSI6InF1ZXJ5IHtcbiAgY2hhcmFjdGVycyhwYWdlOiAyLCBmaWx0ZXI6IHsgbmFtZTogXCJyaWNrXCIgfSkge1xuICAgIGluZm8ge1xuICAgICAgY291bnRcbiAgICB9XG4gICAgcmVzdWx0cyB7XG4gICAgICBuYW1lXG4gICAgfVxuICB9XG4gIGxvY2F0aW9uKGlkOiAxKSB7XG4gICAgaWRcbiAgfVxuICBlcGlzb2Rlc0J5SWRzKGlkczogWzEsIDJdKSB7XG4gICAgaWRcbiAgfVxufSIsInZhcmlhYmxlcyI6IiJ9',
    });

    const messages = require(`../../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContextProvider>
          <StoreProvaider>
            <MainControls />
          </StoreProvaider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('mainControls')).toBeInTheDocument();
    expect(screen.getByTestId('mainControls')).toBeInTheDocument();

    const inputElement = screen.getByLabelText('Url API');
    expect(inputElement).toHaveValue('');
  });
});
