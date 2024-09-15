import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { RequestBodyEditor } from '@/components/restfull/RequestBodyEditor';
import renderWithIntl from '@/__tests__/utils/renderWithIntl';

vi.mock(
  '@uiw/react-codemirror',
  (): {
    __esModule: boolean;
    default: (props: {
      value: string;
      onChange: (value: string) => void;
    }) => JSX.Element;
  } => ({
    __esModule: true,
    default: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }): JSX.Element => (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-testid="code-mirror"
      />
    ),
  })
);

describe('Component RequestBodyEditor', (): void => {
  it('should render the body and handle formatting', (): void => {
    const body = '{ "key": "value" }';
    const setBody = vi.fn();
    const setJsonError = vi.fn();
    const setOpenSnackbar = vi.fn();

    renderWithIntl(
      <RequestBodyEditor
        body={body}
        setBody={setBody}
        jsonError={null}
        setJsonError={setJsonError}
        setOpenSnackbar={setOpenSnackbar}
      />,
      {
        locale: 'en',
        messages: {},
      }
    );

    const editor = screen.getByTestId('code-mirror');
    expect(editor).toHaveValue(body);
  });

  it('should show error when JSON is invalid', (): void => {
    const body = '{ invalid json }';
    const setBody = vi.fn();
    const setJsonError = vi.fn();
    const setOpenSnackbar = vi.fn();

    renderWithIntl(
      <RequestBodyEditor
        body={body}
        setBody={setBody}
        jsonError={'Invalid JSON format'}
        setJsonError={setJsonError}
        setOpenSnackbar={setOpenSnackbar}
      />,
      {
        locale: 'en',
        messages: {},
      }
    );

    const errorElement = screen.getByTestId('json-error');
    expect(errorElement).toHaveTextContent('Invalid JSON format');
  });
});
