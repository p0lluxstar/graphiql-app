import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Registration from '@/components/Registration';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';

vi.mock('next/navigation', () => {
  return {
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(() => ({})),
  };
});

describe('Component Registration', () => {
  it('Сheck that the element with the test id "registration" exists in the DOM', () => {
    const messages = require(`../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <Registration />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('registration')).toBeInTheDocument();
  });
});
