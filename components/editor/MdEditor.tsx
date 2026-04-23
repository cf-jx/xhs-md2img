'use client';

import CodeMirror, { type ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { undo, redo } from '@codemirror/commands';
import { useRef } from 'react';
import { useEditorStore } from '@/lib/store/useEditorStore';
import { cmClaudeTheme } from '@/lib/editor/cmClaudeTheme';

const ACCEPTED_EXT = ['md', 'markdown', 'txt', 'text'];

export function MdEditor() {
  const md = useEditorStore((s) => s.md);
  const setMd = useEditorStore((s) => s.setMd);
  const lines = md.split('\n').length;
  const chars = md.length;

  const cmRef = useRef<ReactCodeMirrorRef>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const runUndo = () => {
    const view = cmRef.current?.view;
    if (view) undo({ state: view.state, dispatch: view.dispatch });
  };
  const runRedo = () => {
    const view = cmRef.current?.view;
    if (view) redo({ state: view.state, dispatch: view.dispatch });
  };

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ACCEPTED_EXT.includes(ext)) {
      alert(`不支持 .${ext}，当前仅接受 ${ACCEPTED_EXT.map((x) => '.' + x).join(' / ')}。把文件转成纯文本再来。`);
      e.target.value = '';
      return;
    }
    const text = await file.text();
    setMd(text);
    e.target.value = '';
  };

  return (
    <div className="h-full w-full flex flex-col" style={{ background: 'var(--surface)' }}>
      <div
        className="flex items-center justify-between px-4 h-10 shrink-0 gap-3"
        style={{ borderBottom: '1px solid var(--rule)' }}
      >
        <div className="flex items-baseline gap-2.5 min-w-0">
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
          <span className="eyebrow hidden sm:inline">Markdown</span>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <IconBtn title="撤销  (Ctrl+Z)" onClick={runUndo}>
            <UndoIcon />
          </IconBtn>
          <IconBtn title="重做  (Ctrl+Shift+Z)" onClick={runRedo}>
            <RedoIcon />
          </IconBtn>
          <span className="mx-1" style={{ width: 1, height: 16, background: 'var(--rule)' }} />
          <IconBtn
            title="从文件导入  (.md / .txt)"
            onClick={() => fileRef.current?.click()}
          >
            <UploadIcon />
          </IconBtn>
          <input
            ref={fileRef}
            type="file"
            accept=".md,.markdown,.txt,.text,text/markdown,text/plain"
            onChange={onImport}
            className="hidden"
          />
        </div>

        <div className="flex items-baseline gap-3 shrink-0">
          <span
            className="tabular-nums hidden sm:inline"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}
          >
            {lines} ln · {chars} ch
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <CodeMirror
          ref={cmRef}
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

function IconBtn({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-[3px] transition-colors"
      style={{
        width: 26,
        height: 26,
        color: 'var(--ink-2)',
        background: 'transparent',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--tan-soft)';
        e.currentTarget.style.color = 'var(--ink)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.style.color = 'var(--ink-2)';
      }}
    >
      {children}
    </button>
  );
}

function UndoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10a6 6 0 0 1 0 12H9" />
    </svg>
  );
}

function RedoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M15 14l5-5-5-5" />
      <path d="M20 9H10a6 6 0 0 0 0 12h5" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 4v12" />
      <path d="M7 9l5-5 5 5" />
      <path d="M5 20h14" />
    </svg>
  );
}
