import type { ComponentType } from 'react';

export type CoverArt = {
  id: string;
  name: string;
  tagline: string;
  bg: string;
  ink: string;
  inkMuted: string;
  quoteBg: string;
  quoteInk: string;
  Decoration: ComponentType;
};

export const MATCH_THEME_ID = 'match-theme';
