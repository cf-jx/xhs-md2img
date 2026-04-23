import type { SizeId, Theme } from '@/lib/themes/types';
import { SIZE_PRESETS } from '@/lib/themes/types';

export type Page = {
  index: number;
  md: string;
  isCover: boolean;
};

const EXPLICIT_BREAK = /\n\s*(?:---+|<!--\s*pagebreak\s*-->)\s*\n/g;

// Body padding matches MarkdownCard.tsx (96 top + 40 bottom) plus footer strip,
// plus a small safety margin so text never lands right at the edge.
const BODY_PADDING_PX = 96 + 40 + 60 + 48;
// Cover padding is larger — but covers are never auto-split, so this value is informational.

export function paginate(md: string, sizeId: SizeId = 'xhs-3-4', theme?: Theme): Page[] {
  const trimmed = md.trim();
  if (!trimmed) return [{ index: 0, md: '', isCover: true }];

  const explicitChunks = trimmed
    .split(EXPLICIT_BREAK)
    .map((s) => s.trim())
    .filter(Boolean);

  if (explicitChunks.length === 0) {
    return [{ index: 0, md: trimmed, isCover: true }];
  }

  const size = SIZE_PRESETS.find((s) => s.id === sizeId) ?? SIZE_PRESETS[0];
  const budgetPx = size.height - BODY_PADDING_PX;
  const contentWidth = size.width - 80 * 2;

  const finalChunks: string[] = [];
  for (let i = 0; i < explicitChunks.length; i++) {
    const chunk = explicitChunks[i];
    // Never auto-split the cover chunk — covers are intentionally compact.
    const isCover = i === 0 && startsWithH1(chunk);
    if (isCover) {
      finalChunks.push(chunk);
      continue;
    }
    const total = measureChunk(chunk, theme, contentWidth);
    if (total <= budgetPx) {
      finalChunks.push(chunk);
    } else {
      finalChunks.push(...autoSplit(chunk, budgetPx, theme, contentWidth));
    }
  }

  return finalChunks.map((chunk, i) => ({
    index: i,
    md: chunk,
    isCover: i === 0 && startsWithH1(chunk),
  }));
}

function autoSplit(chunk: string, budget: number, theme: Theme | undefined, contentWidth: number): string[] {
  const blocks = splitBlocks(chunk);
  const out: string[] = [];
  let buf: string[] = [];
  let used = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const h = blockHeightPx(b, theme, contentWidth);
    // Keep heading with the block that follows it.
    const bufEndsWithHeading = buf.length > 0 && isHeadingOnly(buf[buf.length - 1]);

    if (used + h > budget && buf.length > 0 && !bufEndsWithHeading) {
      out.push(buf.join('\n\n'));
      buf = [];
      used = 0;
    }
    buf.push(b);
    used += h + 20;
  }
  if (buf.length) out.push(buf.join('\n\n'));
  return out.length > 0 ? out : [chunk];
}

function measureChunk(chunk: string, theme: Theme | undefined, contentWidth: number): number {
  const blocks = splitBlocks(chunk);
  let sum = 0;
  for (const b of blocks) sum += blockHeightPx(b, theme, contentWidth) + 20;
  return sum;
}

// Approximate rendered pixel height for a single block.
// Uses theme typography so different themes get different budgets.
function blockHeightPx(block: string, theme: Theme | undefined, contentWidth: number): number {
  const t = theme?.typography;
  const bodySize = t?.bodySize ?? 30;
  const h1 = t?.h1Size ?? 80;
  const h2 = t?.h2Size ?? 52;
  const h3 = t?.h3Size ?? 36;
  const lh = t?.lineHeight ?? 1.7;
  const bodyLh = bodySize * lh;

  // CJK chars render at ~1em; body text is usually CJK-dominant, so assume
  // ~0.92em/char. This is conservative so headings don't land orphaned.
  const charWidthPx = bodySize * 0.92;
  const cpl = Math.max(10, Math.floor(contentWidth / charWidthPx));

  const text = stripMd(block);
  const weighted = weightChars(text);
  const wrappedLines = Math.max(1, Math.ceil(weighted / cpl));

  const trimmed = block.trim();

  if (/^#\s+/.test(trimmed)) {
    // h1 — rarely appears in body (covers take h1), but be generous
    return h1 * 1.15 + 32;
  }
  if (/^##\s+/.test(trimmed)) {
    return h2 * 1.3 + 32;
  }
  if (/^###\s+/.test(trimmed)) {
    return h3 * 1.35 + 28;
  }
  if (trimmed.startsWith('```')) {
    const lines = block.split('\n').length;
    return lines * (22 * 1.55) + 48 + 24;
  }
  if (/^>/m.test(trimmed)) {
    return wrappedLines * bodyLh + 48 + 24;
  }
  // list (ordered or unordered) — one line per item, plus gaps
  if (/^\s*(?:[-*+]|\d+\.)\s/m.test(trimmed)) {
    const items = block.split('\n').filter((l) => /^\s*(?:[-*+]|\d+\.)\s/.test(l));
    let listH = 0;
    for (const it of items) {
      const itemText = stripMd(it.replace(/^\s*(?:[-*+]|\d+\.)\s+/, ''));
      const itemWeighted = weightChars(itemText);
      const itemLines = Math.max(1, Math.ceil(itemWeighted / (cpl - 4)));
      listH += itemLines * bodyLh;
    }
    listH += items.length * 16 + 24;
    return listH;
  }
  if (trimmed === '---') return 18;
  // paragraph
  return wrappedLines * bodyLh + 12;
}

function weightChars(text: string): number {
  let n = 0;
  for (const ch of text) {
    n += /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(ch) ? 2 : 1;
  }
  return n;
}

function splitBlocks(chunk: string): string[] {
  // Blocks are separated by blank lines, but we keep fenced code blocks together.
  const lines = chunk.split('\n');
  const blocks: string[] = [];
  let current: string[] = [];
  let inFence = false;

  const flush = () => {
    if (current.length === 0) return;
    // trim trailing blank lines
    while (current.length && current[current.length - 1].trim() === '') current.pop();
    if (current.length) blocks.push(current.join('\n'));
    current = [];
  };

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inFence = !inFence;
      current.push(line);
      continue;
    }
    if (!inFence && line.trim() === '') {
      flush();
    } else {
      current.push(line);
    }
  }
  flush();
  return blocks;
}

function stripMd(s: string): string {
  return s
    .replace(/`{1,3}[^`]*`{1,3}/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~`-]+/g, '')
    .trim();
}

function startsWithH1(s: string): boolean {
  const first = s.split('\n').find((l) => l.trim().length > 0) ?? '';
  return /^#\s+/.test(first.trim());
}

function isHeadingOnly(block: string): boolean {
  const trimmed = block.trim();
  if (!/^#{1,6}\s/.test(trimmed)) return false;
  return trimmed.split('\n').length === 1;
}
