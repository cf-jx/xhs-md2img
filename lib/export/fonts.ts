'use client';

const FONT_CSS_URL =
  'https://fonts.googleapis.com/css2?' +
  [
    'family=Noto+Sans+SC:wght@300;400;500;700;900',
    'family=Noto+Serif+SC:wght@400;500;700;900',
    'family=Ma+Shan+Zheng',
    'family=JetBrains+Mono:wght@400;500;700',
    'family=LXGW+WenKai:wght@400;500',
    'display=swap',
  ].join('&');

let cache: string | null = null;
let inflight: Promise<string> | null = null;

export async function getFontEmbedCss(): Promise<string> {
  if (cache !== null) return cache;
  if (inflight) return inflight;
  inflight = (async () => {
    try {
      const res = await fetch(FONT_CSS_URL, {
        headers: {
          // Google serves woff2 only to modern UAs; the browser's default UA already qualifies.
          Accept: 'text/css,*/*;q=0.1',
        },
      });
      if (!res.ok) throw new Error(`font css http ${res.status}`);
      const css = await res.text();
      cache = css;
      return css;
    } catch (e) {
      console.warn('[export] font css fetch failed, falling back to empty', e);
      cache = '';
      return '';
    } finally {
      inflight = null;
    }
  })();
  return inflight;
}
