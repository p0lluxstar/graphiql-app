import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';

/* vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi.fn(),
  })); */

describe('Component Footer', () => {
  it('Сheck that the element with the test id "footer" exists in the DOM', () => {
    const messages = require(`../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <Footer />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
