'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useEditorStore } from '@/lib/store/useEditorStore';
import { exportAll, exportSingle } from '@/lib/export/toPng';

type Props = {
  getCardRefs: () => HTMLDivElement[];
};

export function TopBar({ getCardRefs }: Props) {
  const themeId = useEditorStore((s) => s.themeId);
  const [busy, setBusy] = useState<'none' | 'single' | 'all'>('none');

  const handleExportSingle = async () => {
    const refs = getCardRefs();
    if (refs.length === 0) return;
    setBusy('single');
    try {
      await exportSingle(refs[0], `xhs-${themeId}-01.png`);
    } finally {
      setBusy('none');
    }
  };

  const handleExportAll = async () => {
    const refs = getCardRefs();
    if (refs.length === 0) return;
    setBusy('all');
    try {
      await exportAll(refs, `xhs-${themeId}`);
    } finally {
      setBusy('none');
    }
  };

  return (
    <header className="shrink-0">
      <div className="flex items-stretch h-[60px] px-7">
        {/* Wordmark — editorial masthead */}
        <div className="flex items-center gap-3 pr-6 flex-1 md:flex-none md:min-w-0">
          <span
            aria-hidden
            className="inline-flex items-center justify-center"
            style={{
              width: 30,
              height: 30,
              borderRadius: 2,
              background: 'var(--ink)',
              color: 'var(--paper)',
              fontFamily: 'var(--font-display)',
              fontSize: 19,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              paddingTop: 1,
            }}
          >
            X
          </span>
          <div className="flex flex-col leading-none gap-[3px] min-w-0">
            <span
              className="truncate"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 17,
                color: 'var(--ink)',
                letterSpacing: '-0.01em',
                lineHeight: 1,
              }}
            >
              XHS · Type Studio
            </span>
            <span className="eyebrow hidden sm:inline" style={{ letterSpacing: '2.8px' }}>
              Issue №1 · Markdown Edition
            </span>
          </div>
        </div>

        {/* Manifesto — hero identity line */}
        <div className="flex-1 hidden md:flex items-center justify-center px-8 min-w-0">
          <p
            className="byline truncate"
            style={{ fontSize: 14, color: 'var(--ink-3)' }}
          >
            &ldquo;Markdown, set in type.&rdquo;
            <span
              className="mx-3"
              style={{ color: 'var(--rule-strong)', fontStyle: 'normal' }}
            >
              —
            </span>
            <span style={{ fontStyle: 'normal', fontFamily: 'var(--font-sans)' }} className="eyebrow">
              十二套主题 · 四档尺寸
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/themes"
            className="ui-btn ui-btn-ghost hidden sm:inline-flex"
            style={{ textDecoration: 'none' }}
          >
            主题画廊
          </Link>
          <button
            onClick={handleExportSingle}
            disabled={busy !== 'none'}
            className="ui-btn ui-btn-ghost hidden sm:inline-flex"
          >
            {busy === 'single' ? '导出中…' : '导出首图'}
          </button>
          <button
            onClick={handleExportAll}
            disabled={busy !== 'none'}
            className="ui-btn ui-btn-primary whitespace-nowrap"
          >
            <span>{busy === 'all' ? '打包中…' : '导出全部'}</span>
            <span aria-hidden style={{ opacity: 0.7 }}>↓</span>
          </button>
        </div>
      </div>

      {/* Editorial double hairline */}
      <div className="hairline-double" />
    </header>
  );
}
