import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';
import { usePathname, useSearchParams } from 'next/navigation';

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      pathname: '/',
      query: {},
    })),
    usePathname: vi.fn(),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
  };
});

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
    onAuthStateChanged: vi.fn((auth, callback) => {
      const mockUser = { uid: '12345', email: 'test@example.com' };
      callback(mockUser);
      return (): void => {};
    }),
  };
});

describe('Component Header', () => {
  it('Сheck that the element with the test id "header" exists in the DOM', () => {
    (usePathname as vi.Mock).mockReturnValue('/en');
    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn().mockReturnValue(null),
    });

    const messages = require(`../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <Header />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
