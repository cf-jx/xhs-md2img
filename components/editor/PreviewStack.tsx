'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useEditorStore } from '@/lib/store/useEditorStore';
import { getTheme } from '@/lib/themes/registry';
import { SIZE_PRESETS } from '@/lib/themes/types';
import { paginate } from '@/lib/markdown/paginate';
import { MarkdownCard } from '@/components/render/MarkdownCard';
import { getCoverArt } from '@/lib/covers/registry';

type Props = {
  registerRefs: (els: HTMLDivElement[]) => void;
};

export function PreviewStack({ registerRefs }: Props) {
  const md = useEditorStore((s) => s.md);
  const themeId = useEditorStore((s) => s.themeId);
  const coverArtId = useEditorStore((s) => s.coverArtId);
  const sizeId = useEditorStore((s) => s.sizeId);
  const footer = useEditorStore((s) => s.footer);
  const scale = useEditorStore((s) => s.previewScale);

  const theme = useMemo(() => getTheme(themeId), [themeId]);
  const coverArt = useMemo(() => getCoverArt(coverArtId), [coverArtId]);
  const isEmpty = md.trim().length === 0;

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const size = useMemo(
    () => SIZE_PRESETS.find((s) => s.id === sizeId) ?? SIZE_PRESETS[0],
    [sizeId],
  );
  const pages = useMemo(() => paginate(md, sizeId, theme), [md, sizeId, theme]);

  const effectiveScale = useMemo(() => {
    if (containerWidth === 0) return scale;
    // Reserve page-mark column (~72px) + gap + horizontal padding (~80px).
    const available = Math.max(containerWidth - 72 - 24 - 80, 240);
    const fit = available / size.width;
    return Math.min(scale, fit);
  }, [containerWidth, scale, size.width]);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerRefs(refs.current.filter(Boolean) as HTMLDivElement[]);
  });

  return (
    <div
      ref={containerRef}
      className="flex-1 min-h-0 overflow-auto"
      style={{ background: 'var(--paper-deep)' }}
    >
      {/* Stage header — like a masthead above the gallery */}
      <div
        className="sticky top-0 z-10 flex items-baseline justify-between px-10 py-4"
        style={{
          background: 'color-mix(in oklch, var(--paper-deep) 85%, transparent)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div className="flex items-baseline gap-3">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 17,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
            }}
          >
            {theme.name}
          </span>
          <span className="eyebrow">{theme.tagline}</span>
        </div>
        <div className="flex items-baseline gap-4">
          <span className="eyebrow">{pages.length} pages</span>
          <span
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}
          >
            {size.width}×{size.height}
          </span>
        </div>
      </div>

      {isEmpty ? (
        <div className="px-10 py-16 flex flex-col items-center">
          <div
            className="w-full max-w-[520px] flex flex-col gap-6 rise-in"
            style={{ padding: '48px 40px', border: '1px solid var(--rule)', borderRadius: 6, background: 'var(--paper)' }}
          >
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Empty draft</span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 36,
                  letterSpacing: '-0.02em',
                  color: 'var(--ink)',
                  lineHeight: 1.2,
                }}
              >
                还没有内容。
                <br />
                在左栏写一段 Markdown。
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
                用 <code style={{ fontFamily: 'var(--font-mono)' }}>#</code> 做封面标题，
                用 <code style={{ fontFamily: 'var(--font-mono)' }}>---</code> 分页，
                封面风格与正文主题可以在左栏独立搭配。
              </p>
            </div>
          </div>
        </div>
      ) : (
      <div className="px-10 py-14">
        <div className="flex flex-col items-center gap-16 mx-auto" style={{ maxWidth: 'fit-content' }}>
          {pages.map((p, i) => (
            <article
              key={`${themeId}-${i}`}
              className="flex items-start gap-6 rise-in"
              style={{ animationDelay: `${Math.min(i * 70, 420)}ms` }}
            >
              {/* Drop-cap page numeral — editorial ornament */}
              <div
                className="flex flex-col items-end shrink-0 pt-2"
                style={{ minWidth: 72 }}
              >
                <span className="page-mark">
                  {p.isCover ? '00' : String(i).padStart(2, '0')}
                </span>
                <span className="page-mark-sub mt-2">
                  {p.isCover ? 'Cover' : `Page ${i}`}
                </span>
              </div>

              <div className="paper-shadow rounded-[3px] overflow-hidden">
                <MarkdownCard
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  theme={theme}
                  size={size}
                  page={p}
                  total={pages.length}
                  scale={effectiveScale}
                  footer={footer}
                  coverArt={coverArt}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
