import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProtectedRouteNoAuth from '@/components/ProtectedRouteNoAuth';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('ProtectedRouteNoAuth', () => {
  it('should display loader if loading or user is present', () => {
    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: true });

    render(
      <ProtectedRouteNoAuth>
        <div>Protected Content</div>
      </ProtectedRouteNoAuth>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect if user is authenticated', () => {
    const mockRouter = { replace: vi.fn() };
    (useRouter as vi.Mock).mockReturnValue(mockRouter);
    (useAuth as vi.Mock).mockReturnValue({
      user: { uid: 'test-user' },
      loading: false,
    });

    render(
      <ProtectedRouteNoAuth>
        <div>Protected Content</div>
      </ProtectedRouteNoAuth>
    );

    expect(mockRouter.replace).toHaveBeenCalledWith('/');
  });

  it('should render children if not loading and no user is present', () => {
    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: false });

    render(
      <ProtectedRouteNoAuth>
        <div>Protected Content</div>
      </ProtectedRouteNoAuth>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
