'use client';

import { CSSProperties, forwardRef, ReactNode } from 'react';
import type { SizePreset, Theme } from '@/lib/themes/types';

type Props = {
  theme: Theme;
  size: SizePreset;
  scale?: number;
  children: ReactNode;
  variant?: 'cover' | 'body';
};

export const CardFrame = forwardRef<HTMLDivElement, Props>(function CardFrame(
  { theme, size, scale = 1, children, variant = 'body' },
  ref,
) {
  const t = theme.tokens;
  const isCover = variant === 'cover';
  const bg = isCover ? t.coverBg ?? t.bg : t.bg;
  const ink = isCover ? t.coverInk ?? t.ink : t.ink;

  const cssVars: CSSProperties & Record<string, string | number> = {
    '--c-bg': t.bg,
    '--c-surface': t.surface,
    '--c-ink': t.ink,
    '--c-muted': t.muted,
    '--c-accent': t.accent,
    '--c-accent-soft': t.accentSoft,
    '--c-divider': t.divider,
    '--c-code-bg': t.codeBg,
    '--c-code-ink': t.codeInk,
    '--c-quote-bg': t.quoteBg ?? t.accentSoft,
    '--c-quote-border': t.quoteBorder ?? t.accent,
    '--font-title': theme.typography.titleFamily,
    '--font-body': theme.typography.bodyFamily,
    '--fs-h1': `${theme.typography.h1Size}px`,
    '--fs-h2': `${theme.typography.h2Size}px`,
    '--fs-h3': `${theme.typography.h3Size}px`,
    '--fs-body': `${theme.typography.bodySize}px`,
    '--lh': theme.typography.lineHeight,
    '--ls': theme.typography.letterSpacing,
    width: `${size.width}px`,
    height: `${size.height}px`,
    background: bg,
    color: ink,
    fontFamily: theme.typography.bodyFamily,
    fontWeight: theme.typography.bodyWeight,
    letterSpacing: theme.typography.letterSpacing,
    lineHeight: theme.typography.lineHeight,
  };

  const wrapStyle: CSSProperties = {
    width: size.width * scale,
    height: size.height * scale,
  };

  const innerStyle: CSSProperties = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
  };

  return (
    <div style={wrapStyle} className="overflow-hidden rounded-md shadow-xl">
      <div style={innerStyle}>
        <div
          ref={ref}
          data-card-frame
          data-theme={theme.id}
          style={cssVars}
          className="relative overflow-hidden"
        >
          {isCover && (
            <CoverDeco cover={theme.cover} />
          )}
          <div className="relative z-10 w-full h-full flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
});

function CoverDeco({ cover }: { cover: Theme['cover'] }) {
  switch (cover) {
    case 'dark-radial':
      return (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 75% 20%, rgba(212,162,127,.18), transparent 70%),radial-gradient(ellipse 50% 40% at 20% 80%, rgba(199,91,57,.10), transparent 60%)',
          }}
        />
      );
    case 'gradient':
      return (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg,#833AB4 0%,#FD1D1D 50%,#FCB045 100%)',
            opacity: 0.95,
          }}
        />
      );
    case 'terminal':
      return (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)',
          }}
        />
      );
    case 'paper':
      return (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(45deg, rgba(61,46,28,0.03) 0 2px, transparent 2px 6px)',
          }}
        />
      );
    default:
      return null;
  }
}
