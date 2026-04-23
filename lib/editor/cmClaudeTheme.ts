import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

const cream = '#FAF6F1';
const surface = '#FDFCFA';
const ink = '#1F1915';
const ink2 = '#3D2E23';
const muted = '#8C7462';
const terra = '#C75B39';
const tan = '#D4A27F';
const sage = '#7A8B6F';
const brownMid = '#6B5344';

const theme = EditorView.theme(
  {
    '&': {
      color: ink,
      backgroundColor: surface,
    },
    '.cm-content': {
      caretColor: terra,
    },
    '.cm-line': {
      padding: '0 8px',
    },
  },
  { dark: false },
);

const highlight = HighlightStyle.define([
  { tag: t.heading1, color: terra, fontWeight: '900' },
  { tag: t.heading2, color: terra, fontWeight: '700' },
  { tag: t.heading3, color: ink2, fontWeight: '700' },
  { tag: t.heading, color: ink2, fontWeight: '700' },
  { tag: t.strong, color: ink, fontWeight: '700' },
  { tag: t.emphasis, color: tan, fontStyle: 'italic' },
  { tag: t.link, color: terra, textDecoration: 'underline' },
  { tag: t.url, color: tan },
  { tag: t.quote, color: brownMid, fontStyle: 'italic' },
  { tag: t.list, color: ink2 },
  { tag: t.monospace, color: sage },
  { tag: [t.meta, t.processingInstruction], color: muted },
  { tag: t.comment, color: muted, fontStyle: 'italic' },
  { tag: t.atom, color: terra },
  { tag: t.number, color: sage },
  { tag: t.keyword, color: terra },
  { tag: t.string, color: sage },
  { tag: t.content, color: ink },
]);

export const cmClaudeTheme = [theme, syntaxHighlighting(highlight)];
export { cream };
