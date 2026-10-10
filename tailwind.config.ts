/**
 * @file tailwind.config.ts
 *
 * Tailwind CSS content paths plus the AfterBuy colour and font tokens.
 *
 * Every colour here is a CSS custom property defined in app/globals.css, so
 * dark and light themes switch without any Tailwind variant. The `*-rgb`
 * channel tokens let utilities take an alpha suffix (`bg-warm/10`).
 * Fonts are loaded with next/font in app/layout.tsx.
 *
 * @module Config
 */

import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

/**
 * Builds a Tailwind colour value that resolves a space-separated RGB channel
 * custom property and honours the `<alpha-value>` placeholder.
 *
 * @param channelVariable - CSS custom property holding "r g b" channels.
 * @returns A colour string Tailwind can attach an opacity modifier to.
 */
function channelColor(channelVariable: string): string {
  return `rgb(var(${channelVariable}) / <alpha-value>)`;
}

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: channelColor('--accent-rgb'),
          soft: channelColor('--accent-soft-rgb'),
          solid: channelColor('--accent-solid-rgb'),
          'solid-hover': channelColor('--accent-solid-hover-rgb'),
          on: channelColor('--on-accent-rgb'),
        },
        paper: channelColor('--paper-rgb'),
        shade: channelColor('--shade-rgb'),
        sky: channelColor('--sky-rgb'),
        warm: channelColor('--warm-rgb'),
        success: {
          DEFAULT: channelColor('--success-rgb'),
          solid: channelColor('--success-solid-rgb'),
        },
        danger: {
          DEFAULT: channelColor('--danger-rgb'),
          solid: channelColor('--danger-solid-rgb'),
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'ui-sans-serif', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default config;
