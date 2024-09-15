import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import VariablesAndHeadersSection from '@/components/graphiql/VariablesAndHeadersSection';
import { store } from '@/redux/store';
import { variablesSectionActions } from '@/redux/slices/graphiqlVariablesSectionSlice';
import { headersSectionActions } from '@/redux/slices/graphiqlHeadersSectionSlice';
import { NextIntlClientProvider } from 'next-intl';
import { ContextProvider } from '@/context/VisibilityContext';
import StoreProvaider from '@/redux/StoreProvaider';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('handleFormatJson', () => {
  it('should format variables and headers JSON correctly', () => {
    const dispatchMock = vi.spyOn(store, 'dispatch');

    const messages = require(`../../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <ContextProvider>
          <StoreProvaider>
            <VariablesAndHeadersSection />
          </StoreProvaider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    store.dispatch(
      variablesSectionActions.setVariablesSectionCode('{"key":"value"}')
    );
    store.dispatch(
      headersSectionActions.setHeadersSectionCode('{"headerKey":"headerValue"}')
    );

    const formatButton = screen.getByRole('button');
    fireEvent.click(formatButton);

    expect(dispatchMock).toHaveBeenCalledWith(
      variablesSectionActions.setVariablesSectionCode(
        JSON.stringify({ key: 'value' })
      )
    );

    expect(dispatchMock).toHaveBeenCalledWith(
      headersSectionActions.setHeadersSectionCode(
        JSON.stringify({ headerKey: 'headerValue' })
      )
    );

    const headersTab = screen.getByText(/headers/i);
    fireEvent.click(headersTab);

    expect(screen.getByTestId('headers')).toBeInTheDocument();
    expect(screen.queryByTestId('variables')).not.toBeInTheDocument();
  });
});
