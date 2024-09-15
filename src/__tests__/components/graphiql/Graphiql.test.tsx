import { it, expect, describe, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import Graphiql from '@/components/graphiql/Graphiql';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

vi.mock('@/hooks/useAuth', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Component Graphiql', () => {
  it('Redirects to home page if user is not present and loading is false', async () => {
    const router = { replace: vi.fn() };
    (useRouter as vi.Mock).mockReturnValue(router);

    (useAuth as vi.Mock).mockReturnValue({ user: null, loading: false });

    render(<Graphiql />);

    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith('/');
    });
  });
});
