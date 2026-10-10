/**
 * Hero, proof strip, problem, and the three memory layers of the AfterBuy landing page.
 */

'use client';

import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Layers, Shield, Zap } from 'lucide-react';

function tiltOn(event: MouseEvent<HTMLElement>): void {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const px = (event.clientX - rect.left) / rect.width - 0.5;
  const py = (event.clientY - rect.top) / rect.height - 0.5;
  el.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
  el.style.setProperty('--rx', `${(-py * 6).toFixed(2)}deg`);
}

function tiltOff(event: MouseEvent<HTMLElement>): void {
  event.currentTarget.style.setProperty('--ry', '0deg');
  event.currentTarget.style.setProperty('--rx', '0deg');
}

function NodeArt(): JSX.Element {
  return (
    <svg className="art" viewBox="0 0 160 90" aria-hidden="true">
      <circle className="art-node n1" cx="28" cy="48" r="7" />
      <circle className="art-node n2" cx="78" cy="24" r="6" />
      <circle className="art-node n3" cx="124" cy="52" r="8" />
      <path className="art-link" d="M35 46 C52 40, 62 28, 72 26" />
      <path className="art-link d2" d="M84 28 C100 36, 108 46, 116 50" />
    </svg>
  );
}

function GraphArt(): JSX.Element {
  return (
    <svg className="art" viewBox="0 0 160 90" aria-hidden="true">
      <path className="art-link" d="M16 70 C40 68, 48 30, 70 34 S110 20, 144 28" />
      <path className="art-link d2" d="M16 70 C46 72, 70 78, 96 58 S130 62, 144 48" />
      <circle className="art-node n1" cx="16" cy="70" r="4" />
      <circle className="art-node n2" cx="70" cy="34" r="4" />
      <circle className="art-node n3" cx="144" cy="28" r="5" />
    </svg>
  );
}

function TowerArt(): JSX.Element {
  return (
    <svg className="art" viewBox="0 0 160 90" aria-hidden="true">
      <rect className="art-bar b1" x="22" y="48" width="18" height="28" rx="3" />
      <rect className="art-bar b2" x="50" y="30" width="18" height="46" rx="3" />
      <rect className="art-bar b3" x="78" y="18" width="18" height="58" rx="3" />
      <rect className="art-bar b4" x="106" y="38" width="18" height="38" rx="3" />
    </svg>
  );
}

const STATS: ReadonlyArray<{ icon: ReactNode; value: string; count?: string; prefix?: string; suffix?: string; label: string }> = [
  { icon: <Layers size={18} aria-hidden="true" />, value: '3', count: '3', label: 'Memory layers' },
  { icon: <Brain size={18} aria-hidden="true" />, value: '∞', label: 'Buyers remembered' },
  { icon: <Shield size={18} aria-hidden="true" />, value: '100%', count: '100', suffix: '%', label: 'Store isolation' },
  { icon: <Zap size={18} aria-hidden="true" />, value: '<50ms', count: '50', prefix: '<', suffix: 'ms', label: 'Typical recall time' },
];

const LAYERS = [
  {
    art: <NodeArt />,
    kicker: 'Buyer memory',
    title: 'Every buyer is remembered',
    body: 'Preferences, objections and past orders are saved per buyer, so Remy opens the next chat already knowing them.',
    tag: 'afterbuy-prod:tenant:{id}:customer:{id}',
    tone: 'primary',
  },
  {
    art: <GraphArt />,
    kicker: 'Store insight',
    title: 'Your store learns what works',
    body: 'Patterns across buyers surface on their own: which offers land, which delays hurt, what to say next.',
    tag: 'afterbuy-prod:tenant:{id}',
    tone: 'secondary',
  },
  {
    art: <TowerArt />,
    kicker: 'Platform view',
    title: 'Operators see the whole picture',
    body: 'Health, anomalies and activity across every store, together in one control view.',
    tag: 'afterbuy-prod:platform',
    tone: 'highlight',
  },
];

export function MemoryTop(): JSX.Element {
  return (
    <>
      <section id="hero" className="hero" data-crystal="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">The Telegram store that remembers every buyer</p>
            <h1>
              <span className="line-mask"><span className="hero-line grad-text">Every buyer,</span></span>
              <span className="line-mask"><span className="hero-line grad-text">remembered</span></span>
              <span className="line-mask"><span className="hero-line grad-text">on Telegram.</span></span>
            </h1>
            <p className="lede">
              AfterBuy gives your Telegram store a memory. What each buyer bought, asked and hesitated over is kept, so the next reply starts where the last one ended.
            </p>
            <div className="hero-cta">
              <Link href="/login" className="btn btn-fill">
                Open your store
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <a href="#showcase" className="btn btn-ghost">
                See it work
              </a>
            </div>
            <p className="hero-proof">
              <span className="spark" aria-hidden="true">✦</span>
              Buyer Memory · Built on Hindsight by Vectorize
            </p>
          </div>
        </div>
        <a className="scroll-ind" href="#stats">
          <span className="scroll-chevron" aria-hidden="true" />
          <span className="sr-only">Scroll</span>
        </a>
      </section>

      <section id="stats" className="stats" aria-label="Platform guarantees">
        <div className="stats-row">
          {STATS.map((stat) => (
            <article key={stat.label} className="stat">
              <span className="stat-icon">{stat.icon}</span>
              <p
                className="stat-num grad-text"
                data-count={stat.count}
                data-prefix={stat.prefix}
                data-suffix={stat.suffix}
              >
                {stat.value}
              </p>
              <p className="stat-label">{stat.label}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="problem" className="problem" data-crystal="problem">
        <div className="problem-stage">
          <div className="problem-a">
            <h2 className="grad-text">Every chat starts from scratch.</h2>
            <p>This buyer has ordered from you 12 times. Your bot has no idea.</p>
          </div>
          <div className="problem-b">
            <h2 className="grad-text">Not anymore.</h2>
            <p>AfterBuy turns past chats into memory, so the next reply already knows the buyer.</p>
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="wrap">
          <p className="eyebrow">How it works</p>
          <h2 className="grad-text" data-split>
            Memory at three levels. One platform.
          </h2>
          <div className="how-grid reveal-group">
            {LAYERS.map((layer) => (
              <article
                key={layer.tag}
                className={`how-card reveal tone-${layer.tone}`}
                data-cursor="hover"
                onMouseMove={tiltOn}
                onMouseLeave={tiltOff}
              >
                {layer.art}
                <p className="eyebrow">{layer.kicker}</p>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
                <code>{layer.tag}</code>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
