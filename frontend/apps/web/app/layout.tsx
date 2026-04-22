import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JADELI',
  description: 'JADELI — Luxury in the details.',
  icons: {
    icon: '/JDE.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
