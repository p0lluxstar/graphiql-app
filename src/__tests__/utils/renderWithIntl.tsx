import { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

interface RenderWithIntlOptions {
  locale?: string;
  messages?: Record<string, string>;
}

const renderWithIntl = (
  ui: ReactElement,
  { locale = 'en', messages = {} }: RenderWithIntlOptions = {}
): RenderResult => {
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
};

export default renderWithIntl;
