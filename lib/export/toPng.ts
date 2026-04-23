'use client';

import { toPng } from 'html-to-image';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getFontEmbedCss } from './fonts';

type ExportOpts = {
  pixelRatio?: number;
};

async function renderOne(
  el: HTMLElement,
  pixelRatio = 2,
  fontEmbedCSS?: string,
): Promise<string> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  const opts = {
    pixelRatio,
    cacheBust: true,
    fontEmbedCSS,
  };
  // Safari first-paint workaround: render once and discard.
  await toPng(el, { ...opts, pixelRatio: 1 }).catch(() => null);
  return toPng(el, opts);
}

function dataUrlToBase64(url: string): string {
  const comma = url.indexOf(',');
  return comma >= 0 ? url.slice(comma + 1) : url;
}

function download(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function exportSingle(
  el: HTMLElement,
  filename: string,
  opts: ExportOpts = {},
) {
  const fontCss = await getFontEmbedCss();
  const url = await renderOne(el, opts.pixelRatio ?? 2, fontCss);
  download(url, filename);
}

export async function exportAll(
  els: HTMLElement[],
  prefix = 'xhs',
  opts: ExportOpts = {},
) {
  if (els.length === 0) return;
  const fontCss = await getFontEmbedCss();
  const zip = new JSZip();
  for (let i = 0; i < els.length; i++) {
    const url = await renderOne(els[i], opts.pixelRatio ?? 2, fontCss);
    const name = `${prefix}-${String(i + 1).padStart(2, '0')}.png`;
    zip.file(name, dataUrlToBase64(url), { base64: true });
  }
  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${prefix}-${Date.now()}.zip`);
}
