import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://website-dariana-lucia-7em.pages.dev'),
  title: 'Dariana & Lucia — Beauty Studio',
  description: 'Beauty, shaped in every detail. Gene și unghii realizate cu precizie, grijă și stil.',
  icons: { icon: '/assets/brand/favicon.png' },
  alternates: { canonical: '/' },
  openGraph: { title: 'Dariana & Lucia — Beauty Studio', description: 'Gene și unghii realizate cu precizie, grijă și stil.', type: 'website', locale: 'ro_RO', url: '/' },
  twitter: { card: 'summary', title: 'Dariana & Lucia — Beauty Studio', description: 'Gene și unghii realizate cu precizie, grijă și stil.' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                if (window.location.pathname !== '/') return;
                if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
                var navigation = window.performance.getEntriesByType('navigation')[0];
                if (navigation && navigation.type === 'reload') {
                  if (window.location.hash) window.history.replaceState(null, '', window.location.pathname + window.location.search);
                  window.scrollTo(0, 0);
                  document.documentElement.scrollTop = 0;
                  document.body.scrollTop = 0;
                }
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
