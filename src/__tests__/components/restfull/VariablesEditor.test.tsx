import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { NextIntlClientProvider } from 'next-intl';
import StoreProvider from '@/redux/StoreProvaider';
import { VariablesEditor } from '@/components/restfull/VariablesEditor';

describe('Component VariablesEditor', () => {
  it('should render variables and allow adding/removing variables', () => {
    const variables = [{ key: 'variable1', value: 'value1' }];
    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <StoreProvider>
          <VariablesEditor variables={variables} />
        </StoreProvider>
      </NextIntlClientProvider>
    );

    expect(
      screen.getByLabelText('restfull_placeholderVariableKey')
    ).toHaveValue('variable1');
    expect(
      screen.getByLabelText('restfull_placeholderVariableValue')
    ).toHaveValue('value1');
  });

  it('should trigger onVariableChange when variable changes', () => {
    const onVariableChange = vi.fn();
    const variables = [{ key: 'variable1', value: 'value1' }];

    render(
      <NextIntlClientProvider locale="en" messages={{}}>
        <StoreProvider>
          <VariablesEditor
            variables={variables}
            onVariableChange={onVariableChange}
          />
        </StoreProvider>
      </NextIntlClientProvider>
    );

    fireEvent.change(screen.getByLabelText('restfull_placeholderVariableKey'), {
      target: { value: 'variable2' },
    });
    expect(onVariableChange).toHaveBeenCalledWith(0, 'variable2', 'value1');
  });
});
