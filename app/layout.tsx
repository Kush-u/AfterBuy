/**
 * @file app/layout.tsx
 *
 * Root App Router layout for AfterBuy.
 *
 * Wraps every route with the AfterBuy type system (Outfit display, Work Sans body,
 * JetBrains Mono for code and figures), theme bootstrap, and design-token styles.
 *
 * @module App
 */

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { JetBrains_Mono, Outfit, Work_Sans } from 'next/font/google';
import './globals.css';

// Fonts are exposed as CSS variables so globals.css and tailwind.config.ts share one source.
const fontDisplay = Outfit({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const fontBody = Work_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const fontMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'AfterBuy',
    template: '%s — AfterBuy',
  },
  description: 'AfterBuy — the Telegram store that remembers every buyer.',
  // SVG only: the mark is geometric and scales cleanly from 16px up.
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

const THEME_BOOTSTRAP = `
  try {
    const t = localStorage.getItem('afterbuy-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
`;

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
      </head>
      <body>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 2000,
            style: {
              background: 'var(--surface-2, var(--bg-card))',
              border: '1px solid var(--border-soft)',
              borderLeft: '3px solid var(--brand-sky)',
              color: 'var(--text-0, var(--text-1))',
            },
          }}
        />
      </body>
    </html>
  );
}
