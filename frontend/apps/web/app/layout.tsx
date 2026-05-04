import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '../components/Providers';
import { getCurrentCurrency } from '../lib/server-currency';

export const metadata: Metadata = {
  title: 'JADELI',
  description: 'JADELI — Luxury in the details.',
  icons: {
    icon: '/JDE.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const currency = await getCurrentCurrency();
  return (
    <html lang="en">
      <body>
        <Providers initialCurrency={currency}>{children}</Providers>
      </body>
    </html>
  );
}
