import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserAuth from '@/components/UserAuth';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
  };
});

describe('Component UserAuth', () => {
  it('Сheck that the element with the test id "userAuth" exists in the DOM', () => {
    (usePathname as vi.Mock).mockReturnValue('/en');

    const messages = require(`../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <UserAuth currentLocale="en" />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('userAuth')).toBeInTheDocument();
  });
});
