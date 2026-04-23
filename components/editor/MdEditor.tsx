'use client';

import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { useEditorStore } from '@/lib/store/useEditorStore';
import { cmClaudeTheme } from '@/lib/editor/cmClaudeTheme';

export function MdEditor() {
  const md = useEditorStore((s) => s.md);
  const setMd = useEditorStore((s) => s.setMd);
  const lines = md.split('\n').length;
  const chars = md.length;

  return (
    <div className="h-full w-full flex flex-col" style={{ background: 'var(--surface)' }}>
      <div
        className="flex items-baseline justify-between px-6 h-10 shrink-0"
        style={{ borderBottom: '1px solid var(--rule)' }}
      >
        <div className="flex items-baseline gap-2.5">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 15,
              color: 'var(--ink)',
              letterSpacing: '-0.01em',
            }}
          >
            Draft
          </span>
          <span className="eyebrow">Markdown</span>
        </div>
        <div className="flex items-baseline gap-3">
          <span
            className="tabular-nums"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}
          >
            {lines} ln · {chars} ch
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--ink-3)',
              padding: '1px 6px',
              borderRadius: 3,
              background: 'var(--paper-deep)',
            }}
          >
            ---
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <CodeMirror
          value={md}
          extensions={[markdown(), ...cmClaudeTheme]}
          onChange={(v) => setMd(v)}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            foldGutter: false,
          }}
          height="100%"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
}
