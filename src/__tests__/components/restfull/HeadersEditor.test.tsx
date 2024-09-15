import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { HeadersEditor } from '@/components/restfull/HeadersEditor';

describe('Component HeadersEditor', () => {
  it('should render headers and allow adding/removing headers', () => {
    const headers = [{ key: 'Content-Type', value: 'application/json' }];
    const onHeaderChange = vi.fn();
    const onAddHeader = vi.fn();
    const onRemoveHeader = vi.fn();

    render(
      <NextIntlClientProvider
        locale="en"
        messages={{
          restfull_placeholderHeaderKey: 'Header Key',
          restfull_placeholderHeaderValue: 'Header Value',
          restfull_addHeader: 'Add Header',
        }}
      >
        <HeadersEditor
          headers={headers}
          onHeaderChange={onHeaderChange}
          onAddHeader={onAddHeader}
          onRemoveHeader={onRemoveHeader}
        />
      </NextIntlClientProvider>
    );

    const headerKeyInputs = screen.getAllByLabelText('Header Key');
    const headerValueInputs = screen.getAllByLabelText('Header Value');

    expect(headerKeyInputs[0]).toHaveValue('Content-Type');
    expect(headerValueInputs[0]).toHaveValue('application/json');
  });

  it.skip('should trigger onHeaderChange when header key changes', async () => {
    const onHeaderChange = vi.fn();
    const headers = [{ key: 'Content-Type', value: 'application/json' }];
    const onAddHeader = vi.fn();
    const onRemoveHeader = vi.fn();

    render(
      <NextIntlClientProvider
        locale="en"
        messages={{
          restfull_placeholderHeaderKey: 'Header Key',
          restfull_placeholderHeaderValue: 'Header Value',
          restfull_addHeader: 'Add Header',
        }}
      >
        <HeadersEditor
          headers={headers}
          onHeaderChange={onHeaderChange}
          onAddHeader={onAddHeader}
          onRemoveHeader={onRemoveHeader}
        />
      </NextIntlClientProvider>
    );

    const headerKeyInputs = screen.getAllByLabelText('Header Key');

    await userEvent.clear(headerKeyInputs[0]);
    await userEvent.type(headerKeyInputs[0], 'Accept');

    expect(onHeaderChange).toHaveBeenCalledTimes(1);
    expect(onHeaderChange).toHaveBeenCalledWith(
      0,
      'Accept',
      'application/json'
    );
  });
});
