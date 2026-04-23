'use client';

import { create } from 'zustand';
import type { SizeId } from '../themes/types';

export type FooterConfig = {
  enabled: boolean;
  handle: string;      // 小红书号
  watermark: string;   // 自定义水印
  showPageNumber: boolean;
};

type EditorState = {
  md: string;
  themeId: string;
  coverArtId: string;
  sizeId: SizeId;
  footer: FooterConfig;
  previewScale: number;

  setMd: (md: string) => void;
  setThemeId: (id: string) => void;
  setCoverArtId: (id: string) => void;
  setSizeId: (id: SizeId) => void;
  setFooter: (patch: Partial<FooterConfig>) => void;
  setPreviewScale: (s: number) => void;
};

const DEFAULT_MD = `# 烧了3000块我卸载了龙虾

> 真实踩坑 · 省钱指南

---

## 我踩过的坑

- **25 句 "没事干"**，140 块就没了
- 第一批养龙虾的人，没一个省钱的
- 国内模型接上就能省？**想多了**

---

## 为什么这么烧钱

1. 输入输出都按 token 计费
2. Agent 模式会反复思考、反复调用
3. 长上下文窗口，一次对话几十万 token 打底

---

## 我的推荐

### Claude Code
- 官方包月 \$20，无忧
- 额度给得足，够每天高强度用

### Codex
- 另一种风格，代码任务上手快
- 和 Claude Code 互补

---

## 总结

> **别养龙虾了。**
> 该花的花，该省的省，算清楚再动手。

#AI #Claude #ChatGPT #省钱
`;

export const useEditorStore = create<EditorState>((set) => ({
  md: DEFAULT_MD,
  themeId: 'claude',
  coverArtId: 'monet-lily',
  sizeId: 'xhs-3-4',
  footer: {
    enabled: true,
    handle: '@SCF',
    watermark: '',
    showPageNumber: true,
  },
  previewScale: 0.5,

  setMd: (md) => set({ md }),
  setThemeId: (themeId) => set({ themeId }),
  setCoverArtId: (coverArtId) => set({ coverArtId }),
  setSizeId: (sizeId) => set({ sizeId }),
  setFooter: (patch) => set((s) => ({ footer: { ...s.footer, ...patch } })),
  setPreviewScale: (previewScale) => set({ previewScale }),
}));
