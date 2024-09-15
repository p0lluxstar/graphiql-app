import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '@/components/ErrorBoundary';

// Компонент, который генерирует ошибку
function ProblematicComponent(): void {
  throw new Error('Test error');
}

describe('ErrorBoundary', () => {
  it('should render error message when a child component throws an error', () => {
    // Рендерим компонент с ошибкой внутри ErrorBoundary
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something went wrong.../)).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('should render children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Everything is fine</div>
      </ErrorBoundary>
    );

    // Ожидаем, что дочерний компонент отображается
    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });
});
