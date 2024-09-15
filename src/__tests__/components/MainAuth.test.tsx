import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Main from '@/components/Main';
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
    onAuthStateChanged: vi.fn((auth, callback) => {
      const mockUser = {};
      callback(mockUser);
      return (): void => {};
    }),
  };
});

describe('Component Main', () => {
  it('Сheck that the element with the test id "mainPage" exists in the DOM', () => {
    (usePathname as vi.Mock).mockReturnValue('/en');
    const messages = require(`../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <Main />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
  });
});
