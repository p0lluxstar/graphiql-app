import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import VariablesAndHeadersSection from '@/components/graphiql/VariablesAndHeadersSection';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';
import { useRouter } from 'next/navigation';
import { ContextProvider } from '@/context/VisibilityContext';
import store from '@/redux/store';
import { variablesSectionActions } from '@/redux/slices/graphiqlVariablesSectionSlice';
import { headersSectionActions } from '@/redux/slices/graphiqlHeadersSectionSlice';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Component VariablesAndHeadersSection', () => {
  store.dispatch(
    variablesSectionActions.setVariablesSectionCode('{"key": "value"}')
  );
  store.dispatch(
    headersSectionActions.setHeadersSectionCode('{"header": "value"}')
  );

  it('Сheck that the element with the test id "variablesAndHeadersSection" exists in the DOM', () => {
    (useRouter as vi.Mock).mockReturnValue({
      route: 'en/graphiql',
    });

    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <ContextProvider>
          <StoreProvaider>
            <VariablesAndHeadersSection />
          </StoreProvaider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    expect(
      screen.getByTestId('variablesAndHeadersSection')
    ).toBeInTheDocument();
  });

  /* it('Displays CodeMirror for variables section when variables tab is selected', () => {
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <ContextProvider>
          <Provider store={store}>
            <VariablesAndHeadersSection />
          </Provider>
        </ContextProvider>
      </NextIntlClientProvider>
    );

    // Проверяем, что элемент с data-testid="VCodeMirror" отображается
    expect(screen.getByTestId('VCodeMirror')).toBeInTheDocument();
  }); */
});
