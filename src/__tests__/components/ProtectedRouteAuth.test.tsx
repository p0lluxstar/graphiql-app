import { it, describe, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProtectedRouteAuth from '@/components/ProtectedRouteAuth';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useAuth', () => ({
  default: vi.fn(),
}));

describe('Component ProtectedRouteAuth', () => {
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
      <ProtectedRouteAuth>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRouteAuth>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should redirect to "/" when user is not authenticated and loading is false', () => {
    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: false });

    render(
      <ProtectedRouteAuth>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRouteAuth>
    );

    expect(mockReplace).toHaveBeenCalledWith(`/`);
  });

  it('should render children when user is authenticated', () => {
    (useAuth as vi.Mock).mockReturnValue({
      user: { uid: '123' },
      loading: false,
    });

    render(
      <ProtectedRouteAuth>
        <div data-testid="protected-content">Protected Content</div>
      </ProtectedRouteAuth>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
  });
});
