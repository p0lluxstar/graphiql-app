import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import '../../styles/globals.css';
import styles from '../../styles/pages/main.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StoreProvaider from '@/redux/StoreProvaider';
import { ContextProvider } from '@/context/VisibilityContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}): JSX.Element {
  const { locale } = params;

  let messages;
  try {
    // Пытаемся загрузить файл с переводами
    messages = require(`../../../messages/${locale || 'en'}.json`);
  } catch (error) {
    redirect('/en');
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ContextProvider>
            <StoreProvaider>
              <Header />
              <ErrorBoundary>
                <main className={styles.main}>{children}</main>
              </ErrorBoundary>
              <Footer />
            </StoreProvaider>
          </ContextProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
