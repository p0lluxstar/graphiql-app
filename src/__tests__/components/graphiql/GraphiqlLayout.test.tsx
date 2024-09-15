import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import GraphiqlLayout from '@/components/graphiql/GraphiqlLayout';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';
import { ContextProvider } from '@/context/VisibilityContext';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Component GraphiqlLayout', () => {
  it('Сheck that the element with the test id "graphiqlLayout" exists in the DOM', () => {
    (useRouter as vi.Mock).mockReturnValue({
      route: '/en/graphiql',
    });

    const messages = require(`../../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContextProvider>
          <StoreProvaider>
            <GraphiqlLayout />
          </StoreProvaider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('graphiqlLayout')).toBeInTheDocument();
  });
});
