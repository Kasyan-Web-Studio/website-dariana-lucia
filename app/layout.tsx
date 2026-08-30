import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dariana & Lucia — Beauty Studio',
  description: 'Beauty, shaped in every detail. Gene și unghii realizate cu precizie, grijă și stil.',
  icons: { icon: '/assets/brand/favicon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
