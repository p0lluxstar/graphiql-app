import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import History from '@/components/History';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Component History', () => {
  it('Сheck that the element with the test id "history" exists in the DOM', () => {
    (usePathname as vi.Mock).mockReturnValue('/en/restfull');

    const messages = require(`../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <History />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('history')).toBeInTheDocument();
  });
});
