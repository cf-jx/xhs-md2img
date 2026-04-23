import type { Theme } from './types';
import { xhsOfficial } from './presets/xhs-official';
import { claude } from './presets/claude';
import { chatgpt } from './presets/chatgpt';
import { notionMinimal } from './presets/notion-minimal';
import { magazineMono } from './presets/magazine-mono';
import { darkTerminal } from './presets/dark-terminal';
import { zhihuBlue } from './presets/zhihu-blue';
import { instagramGradient } from './presets/instagram-gradient';
import { appleNotes } from './presets/apple-notes';
import { creamGlue } from './presets/cream-glue';
import { retroPaper } from './presets/retro-paper';
import { wechatOfficial } from './presets/wechat-official';

export const THEMES: Theme[] = [
  xhsOfficial,
  claude,
  chatgpt,
  notionMinimal,
  magazineMono,
  darkTerminal,
  zhihuBlue,
  instagramGradient,
  appleNotes,
  creamGlue,
  retroPaper,
  wechatOfficial,
];

export const THEME_MAP: Record<string, Theme> = Object.fromEntries(
  THEMES.map((t) => [t.id, t]),
);

export function getTheme(id: string): Theme {
  return THEME_MAP[id] ?? THEMES[0];
}
