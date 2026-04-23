'use client';

import { useCallback, useRef } from 'react';
import { TopBar } from '@/components/editor/TopBar';
import { Sidebar } from '@/components/editor/Sidebar';
import { MdEditor } from '@/components/editor/MdEditor';
import { PreviewStack } from '@/components/editor/PreviewStack';

export default function Page() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
      <div className="flex-1 min-h-0 flex">
        <Sidebar />
        <div
          className="flex flex-col"
          style={{
            width: 'calc(50% - 138px)',
            minWidth: 340,
            borderRight: '1px solid var(--rule)',
          }}
        >
          <MdEditor />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <PreviewStack registerRefs={registerRefs} />
        </div>
      </div>
    </main>
  );
}
