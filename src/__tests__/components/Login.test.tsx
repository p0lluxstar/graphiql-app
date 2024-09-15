import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Login from '@/components/Login';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
  };
});

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
  };
});

describe('Component Login', () => {
  it('Сheck that the element with the test id "login" exists in the DOM', () => {
    const messages = require(`../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <Login />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
