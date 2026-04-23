'use client';

import type { FooterConfig } from '@/lib/store/useEditorStore';

type Props = {
  footer: FooterConfig;
  page: number;
  total: number;
  isCover: boolean;
};

export function FooterBadge({ footer, page, total, isCover }: Props) {
  if (!footer.enabled) return null;
  const left = footer.handle?.trim();
  const center = footer.watermark?.trim();
  const right = footer.showPageNumber ? `${page + 1} / ${total}` : '';

  if (!left && !center && !right) return null;

  return (
    <div
      className="flex items-center justify-between w-full"
      style={{
        padding: '24px 64px',
        fontSize: 22,
        color: isCover ? 'rgba(255,255,255,.6)' : 'var(--c-muted)',
        letterSpacing: '1px',
        fontWeight: 400,
      }}
    >
      <span>{left}</span>
      <span style={{ opacity: 0.6 }}>{center}</span>
      <span>{right}</span>
    </div>
  );
}
