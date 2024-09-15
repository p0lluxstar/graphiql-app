import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Restfull from '@/components/restfull/Restfull';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvider from '@/redux/StoreProvaider';

vi.mock(
  '@/hooks/useAuth',
  (): {
    default: () => { user: { uid: string; email: string }; loading: boolean };
  } => ({
    default: (): {
      user: { uid: string; email: string };
      loading: boolean;
    } => ({
      user: { uid: 'test-user-id', email: 'test@example.com' },
      loading: false,
    }),
  })
);

vi.mock(
  'next/navigation',
  (): {
    useRouter: () => {
      replace: vi.Mock;
      push: vi.Mock;
      prefetch: vi.Mock;
    };
    usePathname: () => string;
    useSearchParams: () => { get: vi.Mock };
  } => ({
    useRouter: (): {
      replace: vi.Mock;
      push: vi.Mock;
      prefetch: vi.Mock;
    } => ({
      replace: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
    }),
    usePathname: (): string => '/en/restfull/GET/aHR0cDovL2V4YW1wbGUuY29t',
    useSearchParams: (): { get: vi.Mock } => ({
      get: vi.fn(() => null),
    }),
  })
);

vi.mock(
  '@uiw/react-codemirror',
  (): {
    __esModule: true;
    default: React.FC<{ value: string }>;
  } => ({
    __esModule: true,
    default: ({ value }: { value: string }): JSX.Element => <div>{value}</div>,
  })
);

global.fetch = vi.fn(
  (): Promise<Response> =>
    Promise.resolve({
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      url: '',
      redirected: false,
      type: 'basic',
      bodyUsed: false,
      clone: vi.fn(),
      body: null,
      arrayBuffer: vi.fn(),
      blob: vi.fn(),
      formData: vi.fn(),
      json: vi.fn().mockResolvedValue({}),
      text: vi.fn().mockResolvedValue('{}'),
    } as Response)
);

vi.spyOn(window.history, 'replaceState').mockImplementation((): void => {});

describe('Component Restfull', (): void => {
  it('should render Restfull component', async (): Promise<void> => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <StoreProvider>
          <Restfull />
        </StoreProvider>
      </NextIntlClientProvider>
    );

    expect(
      await screen.findByRole('button', { name: 'restfull_send' })
    ).toBeInTheDocument();
  });
});
