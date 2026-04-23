'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { TopBar } from '@/components/editor/TopBar';
import { Sidebar } from '@/components/editor/Sidebar';
import { MdEditor } from '@/components/editor/MdEditor';
import { PreviewStack } from '@/components/editor/PreviewStack';
import { useEditorStore } from '@/lib/store/useEditorStore';
import { THEME_MAP } from '@/lib/themes/registry';

export default function Page() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const setThemeId = useEditorStore((s) => s.setThemeId);
  const [mobilePane, setMobilePane] = useState<'theme' | 'editor' | 'preview'>('preview');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('theme');
    if (t && THEME_MAP[t]) {
      setThemeId(t);
      const url = new URL(window.location.href);
      url.searchParams.delete('theme');
      window.history.replaceState({}, '', url.pathname + url.hash);
    }
  }, [setThemeId]);

  const registerRefs = useCallback((els: HTMLDivElement[]) => {
    cardsRef.current = els;
  }, []);

  const getCardRefs = useCallback(() => cardsRef.current, []);

  return (
    <main
      className="h-screen w-screen flex flex-col overflow-hidden"
      style={{ background: 'var(--ui-bg)' }}
    >
      <TopBar getCardRefs={getCardRefs} />

      {/* Mobile pane tabs */}
      <nav
        className="lg:hidden flex items-stretch shrink-0"
        style={{ borderBottom: '1px solid var(--rule)', background: 'var(--paper)' }}
        aria-label="switch pane"
      >
        {(['theme', 'editor', 'preview'] as const).map((p) => (
          <button
            key={p}
            onClick={() => setMobilePane(p)}
            className="flex-1 py-2.5 text-[13px] transition-colors"
            style={{
              background: mobilePane === p ? 'var(--ink)' : 'transparent',
              color: mobilePane === p ? 'var(--paper)' : 'var(--ink-2)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {p === 'theme' ? '主题' : p === 'editor' ? '编辑' : '预览'}
          </button>
        ))}
      </nav>

      <div className="flex-1 min-h-0 flex">
        <div className={`${mobilePane === 'theme' ? 'flex' : 'hidden'} lg:flex w-full lg:w-auto`}>
          <Sidebar />
        </div>
        <div
          className={`${mobilePane === 'editor' ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-[calc(50%-138px)] lg:min-w-[340px]`}
          style={{ borderRight: '1px solid var(--rule)' }}
        >
          <MdEditor />
        </div>
        <div className={`${mobilePane === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 flex-col min-w-0 w-full`}>
          <PreviewStack registerRefs={registerRefs} />
        </div>
      </div>
    </main>
  );
}
