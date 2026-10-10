/**
 * @file app/(landing)/layout.tsx
 *
 * Public landing shell. Fonts come from the root layout so landing and dashboard share one type system.
 */

import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { LandingShell } from '@/components/landing/LandingShell';
import './landing.css';

export const metadata: Metadata = {
  // Absolute so the root `%s — AfterBuy` template is not appended a second time.
  title: { absolute: 'AfterBuy — The Telegram store that remembers every buyer' },
  description:
    'AfterBuy gives every Telegram store a Buyer Memory: who bought what, when they come back, and what to say next.',
};

type LandingLayoutProps = {
  readonly children: ReactNode;
};

export default function LandingLayout({ children }: LandingLayoutProps): JSX.Element {
  return <LandingShell>{children}</LandingShell>;
}
