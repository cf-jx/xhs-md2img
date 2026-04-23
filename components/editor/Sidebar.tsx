'use client';

import { useState } from 'react';
import { useEditorStore } from '@/lib/store/useEditorStore';
import { THEMES, getTheme } from '@/lib/themes/registry';
import { SIZE_PRESETS, type SizeId } from '@/lib/themes/types';
import { COVER_ARTS } from '@/lib/covers/registry';

export function Sidebar() {
  const themeId = useEditorStore((s) => s.themeId);
  const setThemeId = useEditorStore((s) => s.setThemeId);
  const coverArtId = useEditorStore((s) => s.coverArtId);
  const setCoverArtId = useEditorStore((s) => s.setCoverArtId);
  const sizeId = useEditorStore((s) => s.sizeId);
  const setSizeId = useEditorStore((s) => s.setSizeId);
  const previewScale = useEditorStore((s) => s.previewScale);
  const setPreviewScale = useEditorStore((s) => s.setPreviewScale);
  const footer = useEditorStore((s) => s.footer);
  const setFooter = useEditorStore((s) => s.setFooter);

  const theme = getTheme(themeId);

  return (
    <aside
      className="h-full flex flex-col overflow-y-auto shrink-0 w-full lg:w-[276px]"
      style={{
        background: 'var(--paper)',
        borderRight: '1px solid var(--rule)',
      }}
    >
      <Section number="I" title="Cover" caption="封面风格" collapsible defaultOpen={false}>
        <div className="grid grid-cols-2 gap-1.5">
          <CoverTile
            active={coverArtId === 'match-theme'}
            onClick={() => setCoverArtId('match-theme')}
            label="跟随主题"
            bg={theme.tokens.coverBg ?? theme.tokens.bg}
          />
          {COVER_ARTS.map((ca) => {
            const Dec = ca.Decoration;
            return (
              <CoverTile
                key={ca.id}
                active={coverArtId === ca.id}
                onClick={() => setCoverArtId(ca.id)}
                label={ca.name}
                bg={ca.bg}
                title={ca.tagline}
              >
                <Dec />
              </CoverTile>
            );
          })}
        </div>
      </Section>

      <Section number="II" title="Theme" caption="正文样式" collapsible defaultOpen={false}>
        <ul className="flex flex-col gap-px">
          {THEMES.map((t) => {
            const active = t.id === themeId;
            return (
              <li key={t.id}>
                <button
                  onClick={() => setThemeId(t.id)}
                  className="group w-full flex items-center gap-3 pl-2.5 pr-3 py-[7px] transition-colors text-left rounded-[3px]"
                  style={{
                    background: active ? 'var(--ink)' : 'transparent',
                    color: active ? 'var(--paper)' : 'var(--ink-2)',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.background = 'var(--tan-soft)';
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span
                    aria-hidden
                    className="shrink-0 flex overflow-hidden"
                    style={{
                      width: 22,
                      height: 14,
                      borderRadius: 2,
                      boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.12)',
                    }}
                  >
                    <span style={{ background: t.tokens.bg, flex: 1 }} />
                    <span style={{ background: t.tokens.accent, flex: 1 }} />
                  </span>
                  <span
                    className="text-[13px] font-medium truncate tracking-tight"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {t.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section number="III" title="Format" caption="尺寸档位">
        <div className="flex flex-col gap-px">
          {SIZE_PRESETS.map((s) => {
            const active = s.id === sizeId;
            return (
              <button
                key={s.id}
                onClick={() => setSizeId(s.id as SizeId)}
                className="flex items-center justify-between px-2.5 py-[7px] rounded-[3px] transition-colors text-left"
                style={{
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--paper)' : 'var(--ink-2)',
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = 'var(--tan-soft)';
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = 'transparent';
                }}
              >
                <span className="text-[13px] font-medium tracking-tight">{s.label}</span>
                <span
                  className="text-[10.5px] tabular-nums"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: active ? 'color-mix(in oklch, var(--paper) 70%, transparent)' : 'var(--muted)',
                  }}
                >
                  {s.width}×{s.height}
                </span>
              </button>
            );
          })}
        </div>
      </Section>

      <Section number="IV" title="Zoom" caption="预览缩放">
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0.25}
            max={0.8}
            step={0.05}
            value={previewScale}
            onChange={(e) => setPreviewScale(Number(e.target.value))}
            className="ui-range flex-1"
          />
          <span
            className="text-[11px] tabular-nums w-10 text-right"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}
          >
            {Math.round(previewScale * 100)}%
          </span>
        </div>
      </Section>

      <Section number="V" title="Colophon" caption="页脚与水印">
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: 'var(--ink-2)' }}>
            <input
              type="checkbox"
              checked={footer.enabled}
              onChange={(e) => setFooter({ enabled: e.target.checked })}
              className="ui-checkbox"
            />
            显示页脚
          </label>
          <label className="flex items-center gap-2 text-[13px] cursor-pointer" style={{ color: 'var(--ink-2)' }}>
            <input
              type="checkbox"
              checked={footer.showPageNumber}
              onChange={(e) => setFooter({ showPageNumber: e.target.checked })}
              className="ui-checkbox"
            />
            显示页码
          </label>
          <div className="flex flex-col gap-1.5 mt-1">
            <span className="eyebrow">小红书号</span>
            <input
              type="text"
              value={footer.handle}
              onChange={(e) => setFooter({ handle: e.target.value })}
              placeholder="@YourHandle"
              className="ui-input"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="eyebrow">水印</span>
            <input
              type="text"
              value={footer.watermark}
              onChange={(e) => setFooter({ watermark: e.target.value })}
              placeholder="可选"
              className="ui-input"
            />
          </div>
        </div>
      </Section>

      <div className="flex-1 min-h-5" />

      <footer
        className="px-5 pt-4 pb-5 mt-2"
        style={{ borderTop: '1px solid var(--rule)' }}
      >
        <p className="byline" style={{ fontSize: 12 }}>
          Printed for&nbsp;
          <span style={{ color: 'var(--ink)', fontStyle: 'normal', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            the slow writer
          </span>
          .
        </p>
      </footer>
    </aside>
  );
}

function CoverTile({
  active,
  onClick,
  label,
  bg,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  bg: string;
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title ?? label}
      className="flex flex-col gap-1 rounded-[3px] transition-all text-left p-1"
      style={{
        border: active ? '1.5px solid var(--ink)' : '1px solid var(--rule)',
        background: 'var(--paper)',
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'var(--terra)';
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.borderColor = 'var(--rule)';
      }}
    >
      <div
        className="relative overflow-hidden w-full"
        style={{
          aspectRatio: '3 / 4',
          background: bg,
          borderRadius: 2,
        }}
      >
        {children}
      </div>
      <span
        className="text-[11px] truncate pl-0.5"
        style={{ color: active ? 'var(--ink)' : 'var(--ink-2)', fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </span>
    </button>
  );
}

function Section({
  number,
  title,
  caption,
  children,
  collapsible = false,
  defaultOpen = true,
}: {
  number: string;
  title: string;
  caption: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isOpen = collapsible ? open : true;

  const header = (
    <div
      className="flex items-baseline gap-2.5 px-1"
      style={{
        marginBottom: isOpen ? 12 : 0,
        cursor: collapsible ? 'pointer' : 'default',
        userSelect: collapsible ? 'none' : 'auto',
      }}
      onClick={collapsible ? () => setOpen((o) => !o) : undefined}
      role={collapsible ? 'button' : undefined}
      aria-expanded={collapsible ? isOpen : undefined}
    >
      <span className="numeral" style={{ fontSize: 20, color: 'var(--terra)' }}>
        {number}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 15,
          color: 'var(--ink)',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </span>
      <span className="ml-auto flex items-baseline gap-2">
        <span className="eyebrow">{caption}</span>
        {collapsible && (
          <span
            aria-hidden
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--muted)',
              display: 'inline-block',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
              width: 10,
              textAlign: 'center',
            }}
          >
            ›
          </span>
        )}
      </span>
    </div>
  );

  return (
    <section
      className={collapsible ? 'px-4 pt-5 pb-5' : 'px-4 pt-6 pb-5'}
      style={{ borderBottom: '1px solid var(--rule)' }}
    >
      {header}
      {isOpen && children}
    </section>
  );
}
