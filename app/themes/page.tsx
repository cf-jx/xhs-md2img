'use client';

import Link from 'next/link';
import { THEMES } from '@/lib/themes/registry';
import { SIZE_PRESETS } from '@/lib/themes/types';
import { MarkdownCard } from '@/components/render/MarkdownCard';
import { paginate } from '@/lib/markdown/paginate';

const DEMO_MD = `# 一盏灯 · 一页纸

> 写给周末的自己

---

## 今天的三件事

- **早晨**：煮咖啡，闻豆子
- **午后**：在阳台读十页书
- **夜里**：关灯，只剩风扇声

永远不急，永远不慌。
`;

const SIZE = SIZE_PRESETS[0];

export default function ThemesPage() {
  // For gallery we only render the cover, so use any theme as typography hint.
  const pages = paginate(DEMO_MD, SIZE.id, THEMES[0]);
  const cover = pages[0];

  return (
    <main
      className="min-h-screen"
      style={{ background: 'var(--paper-deep)', color: 'var(--ink)' }}
    >
      <header
        className="sticky top-0 z-20"
        style={{
          background: 'color-mix(in oklch, var(--paper-deep) 88%, transparent)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div className="max-w-[1320px] mx-auto px-10 py-5 flex items-baseline justify-between gap-6">
          <div className="flex items-baseline gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-sans)', fontSize: 13 }}
            >
              <span aria-hidden>←</span> 回到编辑器
            </Link>
            <span className="hairline" style={{ width: 32 }} />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                letterSpacing: '-0.015em',
                color: 'var(--ink)',
              }}
            >
              Gallery
            </span>
            <span className="eyebrow">Twelve themes · Side by side</span>
          </div>
          <span
            className="eyebrow"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)', letterSpacing: '0.14em' }}
          >
            {THEMES.length} themes · {SIZE.width}×{SIZE.height}
          </span>
        </div>
      </header>

      <section className="max-w-[1320px] mx-auto px-10 pt-14 pb-20">
        <div className="mb-14 max-w-[640px]">
          <span className="eyebrow">Same draft, twelve voices</span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 5.2vw, 64px)',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              marginTop: 14,
              color: 'var(--ink)',
            }}
          >
            挑一套最像你说话方式的。
          </h1>
          <p
            className="byline"
            style={{ fontSize: 15, color: 'var(--ink-3)', marginTop: 18 }}
          >
            同一段 draft，切十二种气质。点一张进入编辑器继续修改。
          </p>
        </div>

        <div
          className="grid gap-y-14 gap-x-10"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}
        >
          {THEMES.map((theme) => (
            <Link
              key={theme.id}
              href={`/?theme=${theme.id}`}
              className="group flex flex-col gap-4"
            >
              <div
                className="paper-shadow rounded-[3px] overflow-hidden self-center transition-transform"
                style={{ transformOrigin: 'center top' }}
              >
                <MarkdownCard
                  theme={theme}
                  size={SIZE}
                  page={cover}
                  total={pages.length}
                  scale={0.23}
                  footer={{
                    enabled: true,
                    handle: '@SCF',
                    watermark: '',
                    showPageNumber: true,
                  }}
                />
              </div>
              <div className="flex items-baseline gap-3 pt-1">
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 18,
                    letterSpacing: '-0.01em',
                    color: 'var(--ink)',
                  }}
                >
                  {theme.name}
                </span>
                <span
                  className="eyebrow"
                  style={{
                    background: theme.previewBadge ?? theme.tokens.accent,
                    color: 'var(--paper)',
                    padding: '2px 7px',
                    borderRadius: 2,
                    letterSpacing: '0.12em',
                    fontSize: 9,
                  }}
                >
                  {theme.id.toUpperCase().replace(/-/g, ' ')}
                </span>
              </div>
              <p className="byline" style={{ fontSize: 13, color: 'var(--muted)' }}>
                {theme.tagline}
              </p>
              <span
                className="text-[12px] inline-flex items-center gap-1.5 transition-colors"
                style={{ color: 'var(--terra)', fontFamily: 'var(--font-sans)' }}
              >
                选这套 <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
