import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dariana & Lucia — Lashes & Nails Studio',
  description: 'Website în dezvoltare pentru Dariana, Lash Artist, și Lucia, Nail Artist.',
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
