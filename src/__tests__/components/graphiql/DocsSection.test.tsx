import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import DocsSection from '@/components/graphiql/DocsSection';
import { NextIntlClientProvider } from 'next-intl';
import StoreProvaider from '@/redux/StoreProvaider';

describe('Component DocsSection', () => {
  it('Сheck that the element with the test id "docsSectionWrapper" exists in the DOM', () => {
    const messages = require(`../../../../messages/en.json`);

    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <StoreProvaider>
          <DocsSection />
        </StoreProvaider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId('docsSectionWrapper')).toBeInTheDocument();
  });
});
