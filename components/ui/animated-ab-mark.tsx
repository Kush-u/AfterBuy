/**
 * @file components/ui/animated-ab-mark.tsx
 *
 * Animated AfterBuy mark: an "A" chevron whose crossbar is a dot. Pure SVG, no image asset.
 *
 * Mirrors public/logo.svg so the brand reads the same on auth and onboarding
 * screens as it does in the browser tab. Colours come from the `--mark-*`
 * custom properties in app/globals.css so both themes are covered. Used by
 * the login page, auth chrome, and the onboarding wizard.
 *
 * @module Components
 */

type AnimatedAbMarkProps = {
  readonly size?: number;
  readonly float?: boolean;
};

/**
 * Renders the AfterBuy mark with a soft glow. Float and stroke pulse are CSS-only
 * and switched off under `prefers-reduced-motion` in globals.css.
 *
 * @param props.size - Rendered width and height in pixels (default 80).
 * @param props.float - Whether the mark gently bobs (default true).
 * @returns The mark as an inline SVG, hidden from assistive tech (decorative).
 */
export function AnimatedAbMark({ size = 80, float = true }: AnimatedAbMarkProps): JSX.Element {
  return (
    <div
      className="relative isolate inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{ backgroundColor: 'var(--mark-halo)' }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={float ? 'ab-mark-float relative' : 'relative'}
        style={{ filter: 'drop-shadow(0 0 8px var(--mark-glow))' }}
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          fill="var(--mark-fill)"
          stroke="var(--mark-stroke)"
          strokeWidth={1}
          className="ab-mark-pulse"
        />
        <path
          d="M8 24 16 8l8 16"
          stroke="var(--mark-stroke)"
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ab-mark-pulse"
        />
        <circle cx="16" cy="20" r="2.4" fill="var(--mark-dot)" />
      </svg>
    </div>
  );
}
