import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResponseViewer } from '@/components/restfull/ResponseViewer';

vi.mock(
  '@uiw/react-codemirror',
  (): {
    __esModule: boolean;
    default: (props: { value: string }) => JSX.Element;
  } => ({
    __esModule: true,
    default: ({ value }: { value: string }): JSX.Element => (
      <div data-testid="code-mirror">{value}</div>
    ),
  })
);

describe('Component ResponseViewer', (): void => {
  it('should render the response status and body', (): void => {
    const response = { status: '200', body: '{ "message": "success" }' };

    render(<ResponseViewer response={response} />);

    expect(screen.getByText(/Status: 200/)).toBeInTheDocument();
    expect(screen.getByTestId('code-mirror')).toHaveTextContent(
      '{ "message": "success" }'
    );
  });
});
