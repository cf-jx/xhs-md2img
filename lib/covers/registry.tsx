'use client';

import type { CoverArt } from './types';

const MinimalWhite: CoverArt = {
  id: 'minimal-white',
  name: '极简白',
  tagline: '一张白纸',
  bg: '#FFFFFF',
  ink: '#0A0A0A',
  inkMuted: '#6B6B6B',
  quoteBg: '#F3F2EE',
  quoteInk: '#2A2A28',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'linear-gradient(180deg, rgba(0,0,0,0.035) 0%, transparent 14%), linear-gradient(0deg, rgba(0,0,0,0.03) 0%, transparent 12%)',
      }}
    />
  ),
};

const CreamPaper: CoverArt = {
  id: 'cream-paper',
  name: '奶油手稿',
  tagline: '温暖纸笺',
  bg: '#F6EFDE',
  ink: '#2D261C',
  inkMuted: '#7A6E55',
  quoteBg: '#EAE0C5',
  quoteInk: '#2D261C',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'repeating-linear-gradient(45deg, rgba(61,46,28,0.025) 0 2px, transparent 2px 8px)',
      }}
    />
  ),
};

const MonetLily: CoverArt = {
  id: 'monet-lily',
  name: '莫奈 · 睡莲',
  tagline: '印象派柔色',
  bg: '#F1EBD6',
  ink: '#1F2A28',
  inkMuted: '#556660',
  quoteBg: 'rgba(255,255,255,0.55)',
  quoteInk: '#1F2A28',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          'radial-gradient(ellipse 55% 45% at 22% 28%, #9BBDA4 0%, rgba(155,189,164,0) 58%)',
          'radial-gradient(ellipse 60% 48% at 78% 72%, #B8A3C7 0%, rgba(184,163,199,0) 60%)',
          'radial-gradient(ellipse 45% 32% at 74% 22%, #D6C49A 0%, rgba(214,196,154,0) 55%)',
          'radial-gradient(ellipse 62% 50% at 20% 78%, #7F9FB8 0%, rgba(127,159,184,0) 62%)',
          'radial-gradient(ellipse 40% 32% at 52% 52%, rgba(255,255,255,0.3) 0%, transparent 70%)',
        ].join(','),
      }}
    />
  ),
};

const VanGoghStarry: CoverArt = {
  id: 'van-gogh-starry',
  name: '梵高 · 星夜',
  tagline: '深蓝与星辉',
  bg: '#0E1B3A',
  ink: '#F5E6B0',
  inkMuted: 'rgba(245,230,176,0.68)',
  quoteBg: 'rgba(245,230,176,0.12)',
  quoteInk: '#F5E6B0',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          'radial-gradient(circle 120px at 22% 22%, #F5D96B 0%, rgba(245,217,107,0.38) 32%, transparent 60%)',
          'radial-gradient(circle 20px at 72% 18%, #FFF3B0 0%, rgba(255,243,176,0.25) 40%, transparent 70%)',
          'radial-gradient(circle 14px at 50% 12%, #FFF3B0 0%, transparent 60%)',
          'radial-gradient(circle 10px at 85% 40%, #FFF3B0 0%, transparent 60%)',
          'radial-gradient(circle 8px at 35% 55%, #FFF3B0 0%, transparent 60%)',
          'radial-gradient(ellipse 90% 70% at 40% 92%, #2D4A7E 0%, transparent 72%)',
          'radial-gradient(ellipse 70% 50% at 70% 80%, #4A6EA5 0%, transparent 72%)',
        ].join(','),
      }}
    />
  ),
};

const Rothko: CoverArt = {
  id: 'rothko-field',
  name: '罗斯科 · 色域',
  tagline: '双色堆叠',
  bg: 'linear-gradient(180deg, #B54A28 0%, #B54A28 36%, #941F1F 42%, #941F1F 64%, #3A0D0A 72%)',
  ink: '#FCE8C4',
  inkMuted: 'rgba(252,232,196,0.65)',
  quoteBg: 'rgba(252,232,196,0.14)',
  quoteInk: '#FCE8C4',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 80% 30% at 50% 42%, rgba(255,255,255,0.06) 0%, transparent 70%)',
      }}
    />
  ),
};

const SumiInk: CoverArt = {
  id: 'sumi-ink',
  name: '日式水墨',
  tagline: '一笔即是山川',
  bg: '#F2E8D2',
  ink: '#0D0D0D',
  inkMuted: '#5F5647',
  quoteBg: 'rgba(13,13,13,0.05)',
  quoteInk: '#0D0D0D',
  Decoration: () => (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M 6 12 C 28 7, 52 20, 68 17 C 80 15, 88 22, 92 30"
        stroke="#0D0D0D"
        strokeWidth="0.55"
        fill="none"
        strokeLinecap="round"
        opacity="0.88"
      />
      <path
        d="M 10 82 Q 26 74, 42 82 T 68 84"
        stroke="#0D0D0D"
        strokeWidth="0.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="84" cy="76" r="5.5" fill="#B51515" opacity="0.92" />
    </svg>
  ),
};

const Mondrian: CoverArt = {
  id: 'mondrian',
  name: '蒙德里安',
  tagline: '红黄蓝三原色',
  bg: '#FAFAFA',
  ink: '#0A0A0A',
  inkMuted: '#555555',
  quoteBg: '#F3F0E4',
  quoteInk: '#0A0A0A',
  Decoration: () => (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect x="0" y="0" width="38" height="26" fill="#E52521" />
      <rect x="76" y="62" width="24" height="38" fill="#0B4CB0" />
      <rect x="62" y="0" width="20" height="18" fill="#FFC728" />
      <line x1="38" y1="0" x2="38" y2="100" stroke="#0A0A0A" strokeWidth="1.1" />
      <line x1="76" y1="0" x2="76" y2="100" stroke="#0A0A0A" strokeWidth="1" />
      <line x1="0" y1="26" x2="100" y2="26" stroke="#0A0A0A" strokeWidth="1.1" />
      <line x1="0" y1="62" x2="100" y2="62" stroke="#0A0A0A" strokeWidth="1" />
      <line x1="62" y1="0" x2="62" y2="26" stroke="#0A0A0A" strokeWidth="1" />
      <line x1="62" y1="18" x2="76" y2="18" stroke="#0A0A0A" strokeWidth="1" />
    </svg>
  ),
};

const UkiyoWave: CoverArt = {
  id: 'ukiyo-wave',
  name: '浮世绘 · 浪',
  tagline: '靛青与白浪',
  bg: '#E8DFC8',
  ink: '#0C2A52',
  inkMuted: '#476289',
  quoteBg: 'rgba(12,42,82,0.08)',
  quoteInk: '#0C2A52',
  Decoration: () => (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M 0 70 Q 15 55, 30 70 T 60 70 T 100 70 L 100 100 L 0 100 Z"
        fill="#0C2A52"
      />
      <path
        d="M 0 78 Q 15 66, 30 78 T 60 78 T 100 78"
        stroke="#E8DFC8"
        fill="none"
        strokeWidth="0.8"
      />
      <path
        d="M 0 86 Q 15 74, 30 86 T 60 86 T 100 86"
        stroke="#E8DFC8"
        fill="none"
        strokeWidth="0.55"
        opacity="0.7"
      />
      <circle cx="78" cy="18" r="7" fill="#D94835" />
    </svg>
  ),
};

const TurnerSunset: CoverArt = {
  id: 'turner-sunset',
  name: '特纳 · 落日',
  tagline: '暖光涌动',
  bg: 'radial-gradient(ellipse 80% 70% at 50% 55%, #FBDEB3 0%, #F5A26B 30%, #D15F55 55%, #6B2E3B 85%)',
  ink: '#3B1505',
  inkMuted: 'rgba(59,21,5,0.65)',
  quoteBg: 'rgba(255,243,224,0.55)',
  quoteInk: '#3B1505',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          'radial-gradient(circle 100px at 52% 42%, rgba(255,244,200,0.7) 0%, transparent 55%)',
          'linear-gradient(180deg, transparent 68%, rgba(107,46,59,0.32) 100%)',
        ].join(','),
      }}
    />
  ),
};

const Kandinsky: CoverArt = {
  id: 'kandinsky',
  name: '康定斯基 · 几何',
  tagline: '圆与线的游戏',
  bg: '#F4ECDA',
  ink: '#1A1A1A',
  inkMuted: '#555555',
  quoteBg: 'rgba(26,26,26,0.06)',
  quoteInk: '#1A1A1A',
  Decoration: () => (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="20" cy="20" r="10" fill="#E52521" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="#0B4CB0" strokeWidth="0.55" />
      <polygon points="80,15 92,30 68,30" fill="#FFC728" />
      <line x1="28" y1="85" x2="92" y2="74" stroke="#0A0A0A" strokeWidth="0.7" />
      <circle cx="75" cy="82" r="5" fill="#0B4CB0" />
      <circle cx="82" cy="40" r="2.8" fill="#1A1A1A" />
      <line x1="10" y1="58" x2="32" y2="70" stroke="#E52521" strokeWidth="0.5" />
    </svg>
  ),
};

const GradientPop: CoverArt = {
  id: 'gradient-pop',
  name: '潮流渐变',
  tagline: 'IG 式三色',
  bg: 'linear-gradient(165deg, #FF6B9D 0%, #8B5FBF 48%, #4C9EEB 100%)',
  ink: '#FFFFFF',
  inkMuted: 'rgba(255,255,255,0.78)',
  quoteBg: 'rgba(255,255,255,0.18)',
  quoteInk: '#FFFFFF',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(ellipse 60% 40% at 30% 25%, rgba(255,255,255,0.22) 0%, transparent 60%)',
      }}
    />
  ),
};

const RetroRiso: CoverArt = {
  id: 'retro-riso',
  name: '复古双色印',
  tagline: 'Risograph 油墨',
  bg: '#F1E8D5',
  ink: '#2A1A1A',
  inkMuted: '#5F4E3E',
  quoteBg: 'rgba(42,26,26,0.07)',
  quoteInk: '#2A1A1A',
  Decoration: () => (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background: [
          'radial-gradient(circle 200px at 20% 28%, #FF8AA3 0%, rgba(255,138,163,0) 60%)',
          'radial-gradient(circle 170px at 80% 74%, #4EA8A2 0%, rgba(78,168,162,0) 60%)',
        ].join(','),
        mixBlendMode: 'multiply',
      }}
    />
  ),
};

export const COVER_ARTS: CoverArt[] = [
  MinimalWhite,
  CreamPaper,
  MonetLily,
  VanGoghStarry,
  Rothko,
  SumiInk,
  Mondrian,
  UkiyoWave,
  TurnerSunset,
  Kandinsky,
  GradientPop,
  RetroRiso,
];

export const COVER_MAP: Record<string, CoverArt> = Object.fromEntries(
  COVER_ARTS.map((c) => [c.id, c]),
);

export function getCoverArt(id: string | null | undefined): CoverArt | null {
  if (!id || id === 'match-theme') return null;
  return COVER_MAP[id] ?? null;
}
