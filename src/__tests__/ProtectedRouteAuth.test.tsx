import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProtectedRouteAuth from '@/components/ProtectedRouteAuth';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('ProtectedRouteAuth', () => {
  it('should display loader if loading is true or user is not present', () => {
    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: true });

    render(
      <ProtectedRouteAuth>
        <div>Protected Content</div>
      </ProtectedRouteAuth>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect if user is not authenticated and loading is false', () => {
    const mockRouter = { replace: vi.fn() };
    (useRouter as vi.Mock).mockReturnValue(mockRouter);
    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: false });

    render(
      <ProtectedRouteAuth>
        <div>Protected Content</div>
      </ProtectedRouteAuth>
    );

    expect(mockRouter.replace).toHaveBeenCalledWith('/');
  });

  it('should render children if user is authenticated and not loading', () => {
    (useAuth as vi.Mock).mockReturnValue({
      user: { uid: 'test-user' },
      loading: false,
    });

    render(
      <ProtectedRouteAuth>
        <div>Protected Content</div>
      </ProtectedRouteAuth>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});
