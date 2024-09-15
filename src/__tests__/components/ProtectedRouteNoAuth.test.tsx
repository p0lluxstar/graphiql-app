import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedRouteNoAuth from '@/components/ProtectedRouteNoAuth';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  default: vi.fn(),
}));

describe('Component ProtectedRouteNoAuth', () => {
  const mockPush = vi.fn();
  const mockReplace = vi.fn();

  beforeEach(() => {
    (useRouter as vi.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });
  });

  it('should render Loader when loading is true', () => {
    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: true });

    render(
      <ProtectedRouteNoAuth>
        <div data-testid="non-protected-content">Non-Protected Content</div>
      </ProtectedRouteNoAuth>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect to "/" when user is authenticated and loading is false', () => {
    (useAuth as vi.Mock).mockReturnValue({
      user: { uid: '123' },
      loading: false,
    });

    render(
      <ProtectedRouteNoAuth>
        <div data-testid="non-protected-content">Non-Protected Content</div>
      </ProtectedRouteNoAuth>
    );

    expect(mockReplace).toHaveBeenCalledWith(`/`);
  });

  it('should render children when user is not authenticated', () => {
    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: false });

    render(
      <ProtectedRouteNoAuth>
        <div data-testid="non-protected-content">Non-Protected Content</div>
      </ProtectedRouteNoAuth>
    );

    expect(screen.getByTestId('non-protected-content')).toBeInTheDocument();
  });
});
