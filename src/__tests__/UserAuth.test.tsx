import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import UserAuth from '@/components/UserAuth';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Component UserAuth', () => {
  it('renders login and registration links', () => {
    (usePathname as vi.Mock).mockReturnValue('/en/login');

    render(
      <NextIntlClientProvider
        locale="en"
        messages={{ login: 'Login', registration: 'Registration' }}
      >
        <UserAuth currentLocale="en" />
      </NextIntlClientProvider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('applies active class to login link when on /login', () => {
    (usePathname as vi.Mock).mockReturnValue('/en/login');

    const { container } = render(
      <NextIntlClientProvider
        locale="en"
        messages={{ login: 'Login', registration: 'Registration' }}
      >
        <UserAuth currentLocale="en" />
      </NextIntlClientProvider>
    );

    const loginLink = container.querySelector('a[href="/en/login"]');
    const registrationLink = container.querySelector(
      'a[href="/en/registration"]'
    );

    expect(loginLink?.className).toContain('active');
    expect(registrationLink?.className).not.toContain('active');
  });

  it('applies active class to registration link when on /registration', () => {
    (usePathname as vi.Mock).mockReturnValue('/en/registration');

    const { container } = render(
      <NextIntlClientProvider
        locale="en"
        messages={{ login: 'Login', registration: 'Registration' }}
      >
        <UserAuth currentLocale="en" />
      </NextIntlClientProvider>
    );

    const loginLink = container.querySelector('a[href="/en/login"]');
    const registrationLink = container.querySelector(
      'a[href="/en/registration"]'
    );

    expect(registrationLink?.className).toContain('active');
    expect(loginLink?.className).not.toContain('active');
  });
});
