import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import '../../styles/globals.css';
import styles from '../../styles/pages/main.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}): JSX.Element {
  const { locale } = params;

  const messages = require(`../../../messages/${locale || 'en'}.json`);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
