export type SizeId = 'xhs-3-4' | 'xhs-4-5' | 'square' | 'landscape-4-3';

export type SizePreset = {
  id: SizeId;
  label: string;
  hint: string;
  width: number;
  height: number;
};

export const SIZE_PRESETS: SizePreset[] = [
  { id: 'xhs-3-4', label: '竖版 3:4', hint: '小红书主流', width: 1080, height: 1440 },
  { id: 'xhs-4-5', label: '长竖 4:5', hint: '信息流最大展示', width: 1080, height: 1350 },
  { id: 'square', label: '方图 1:1', hint: '稳妥通用', width: 1080, height: 1080 },
  { id: 'landscape-4-3', label: '横版 4:3', hint: '横图/引用', width: 1440, height: 1080 },
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
  quoteInk?: string;
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
