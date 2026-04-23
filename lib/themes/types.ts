export type SizeId = 'xhs-3-4' | 'xhs-4-5' | 'square' | 'story-9-16';

export type SizePreset = {
  id: SizeId;
  label: string;
  width: number;
  height: number;
};

export const SIZE_PRESETS: SizePreset[] = [
  { id: 'xhs-3-4', label: '小红书竖版 3:4', width: 1080, height: 1440 },
  { id: 'xhs-4-5', label: '小红书 4:5', width: 1080, height: 1350 },
  { id: 'square', label: '正方形 1:1', width: 1080, height: 1080 },
  { id: 'story-9-16', label: '故事 9:16', width: 1080, height: 1920 },
];

export type ThemeTokens = {
  bg: string;
  surface: string;
  ink: string;
  muted: string;
  accent: string;
  accentSoft: string;
  divider: string;
  codeBg: string;
  codeInk: string;
  coverBg?: string;
  coverInk?: string;
  quoteBg?: string;
  quoteBorder?: string;
};

export type ThemeTypography = {
  titleFamily: string;
  bodyFamily: string;
  titleWeight: number;
  bodyWeight: number;
  h1Size: number;
  h2Size: number;
  h3Size: number;
  bodySize: number;
  lineHeight: number;
  letterSpacing: string;
};

export type CoverStyle =
  | 'dark-radial'
  | 'cream-minimal'
  | 'gradient'
  | 'mono-bold'
  | 'paper'
  | 'terminal'
  | 'xhs-pop'
  | 'zhihu-card'
  | 'apple-note'
  | 'cream-glue'
  | 'retro-stamp'
  | 'wechat-line';

export type Theme = {
  id: string;
  name: string;
  tagline: string;
  tokens: ThemeTokens;
  typography: ThemeTypography;
  cover: CoverStyle;
  previewBadge?: string;
};
