import type { SizeId } from '@/lib/themes/types';

export type Page = {
  index: number;
  md: string;
  isCover: boolean;
};

const EXPLICIT_BREAK = /\n\s*(?:---+|<!--\s*pagebreak\s*-->)\s*\n/g;

// Character budgets per size — conservative, leaves room for padding / footer.
// Tuned for default body size 28-30px with line-height 1.7.
const CHAR_BUDGET: Record<SizeId, number> = {
  'xhs-3-4': 420,
  'xhs-4-5': 400,
  square: 320,
  'story-9-16': 560,
};

export function paginate(md: string, sizeId: SizeId = 'xhs-3-4'): Page[] {
  const trimmed = md.trim();
  if (!trimmed) return [{ index: 0, md: '', isCover: true }];

  const explicitChunks = trimmed
    .split(EXPLICIT_BREAK)
    .map((s) => s.trim())
    .filter(Boolean);

  if (explicitChunks.length === 0) {
    return [{ index: 0, md: trimmed, isCover: true }];
  }

  const budget = CHAR_BUDGET[sizeId] ?? 420;
  const finalChunks: string[] = [];
  for (let i = 0; i < explicitChunks.length; i++) {
    const chunk = explicitChunks[i];
    // Never auto-split the cover chunk — covers are intentionally compact.
    const isCover = i === 0 && startsWithH1(chunk);
    if (isCover || weight(chunk) <= budget) {
      finalChunks.push(chunk);
    } else {
      finalChunks.push(...autoSplit(chunk, budget));
    }
  }

  return finalChunks.map((chunk, i) => ({
    index: i,
    md: chunk,
    isCover: i === 0 && startsWithH1(chunk),
  }));
}

function autoSplit(chunk: string, budget: number): string[] {
  const blocks = splitBlocks(chunk);
  const out: string[] = [];
  let buf: string[] = [];
  let used = 0;
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const w = weight(b);
    // Keep heading with the block that follows it — do not flush if current
    // buffer ends with a heading-only line.
    const bufEndsWithHeading = buf.length > 0 && isHeadingOnly(buf[buf.length - 1]);

    if (used + w > budget && buf.length > 0 && !bufEndsWithHeading) {
      out.push(buf.join('\n\n'));
      buf = [];
      used = 0;
    }
    buf.push(b);
    used += w + 24; // per-block padding
  }
  if (buf.length) out.push(buf.join('\n\n'));
  return out.length > 0 ? out : [chunk];
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

function weight(block: string): number {
  // Approx rendered char cost; CJK counts heavier than ASCII.
  const text = stripMd(block);
  let n = 0;
  for (const ch of text) {
    n += /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/.test(ch) ? 2 : 1;
  }
  // Block type surcharges.
  if (/^#{1,3}\s/.test(block.trim())) n += 40;            // heading occupies extra vertical space
  if (/^>/m.test(block)) n += 30;                         // blockquote padding
  if (/^\s*(?:[-*+]|\d+\.)\s/m.test(block)) {
    const items = block.split('\n').filter((l) => /^\s*(?:[-*+]|\d+\.)\s/.test(l)).length;
    n += items * 12;                                      // list item spacing
  }
  if (block.includes('```')) n += 60;                     // code block padding
  return n;
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
