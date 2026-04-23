'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useEditorStore } from '@/lib/store/useEditorStore';
import { getTheme } from '@/lib/themes/registry';
import { SIZE_PRESETS } from '@/lib/themes/types';
import { paginate } from '@/lib/markdown/paginate';
import { MarkdownCard } from '@/components/render/MarkdownCard';

type Props = {
  registerRefs: (els: HTMLDivElement[]) => void;
};

export function PreviewStack({ registerRefs }: Props) {
  const md = useEditorStore((s) => s.md);
  const themeId = useEditorStore((s) => s.themeId);
  const sizeId = useEditorStore((s) => s.sizeId);
  const footer = useEditorStore((s) => s.footer);
  const scale = useEditorStore((s) => s.previewScale);

  const theme = useMemo(() => getTheme(themeId), [themeId]);
  const size = useMemo(
    () => SIZE_PRESETS.find((s) => s.id === sizeId) ?? SIZE_PRESETS[0],
    [sizeId],
  );
  const pages = useMemo(() => paginate(md, sizeId), [md, sizeId]);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    registerRefs(refs.current.filter(Boolean) as HTMLDivElement[]);
  });

  return (
    <div
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
                  scale={scale}
                  footer={footer}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
