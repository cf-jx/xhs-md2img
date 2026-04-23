'use client';

import { forwardRef, useMemo } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import type { SizePreset, Theme } from '@/lib/themes/types';
import type { Page } from '@/lib/markdown/paginate';
import type { FooterConfig } from '@/lib/store/useEditorStore';
import { CardFrame } from './CardFrame';
import { FooterBadge } from './FooterBadge';

type Props = {
  theme: Theme;
  size: SizePreset;
  page: Page;
  total: number;
  scale?: number;
  footer: FooterConfig;
};

export const MarkdownCard = forwardRef<HTMLDivElement, Props>(function MarkdownCard(
  { theme, size, page, total, scale = 1, footer },
  ref,
) {
  const components = useMemo<Components>(
    () => buildComponents(theme, page.isCover),
    [theme, page.isCover],
  );

  const padding = page.isCover
    ? { padding: '140px 90px 140px' }
    : { padding: '96px 80px 40px' };

  return (
    <CardFrame
      ref={ref}
      theme={theme}
      size={size}
      scale={scale}
      variant={page.isCover ? 'cover' : 'body'}
    >
      <div
        className="flex-1 min-h-0 flex flex-col"
        style={{
          ...padding,
          justifyContent: page.isCover ? 'center' : 'flex-start',
          gap: page.isCover ? 28 : 20,
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          components={components}
        >
          {page.md}
        </ReactMarkdown>
      </div>
      <FooterBadge
        footer={footer}
        page={page.index}
        total={total}
        isCover={page.isCover}
      />
    </CardFrame>
  );
});

function buildComponents(theme: Theme, isCover: boolean): Components {
  const ink = isCover
    ? theme.tokens.coverInk ?? theme.tokens.ink
    : theme.tokens.ink;
  const titleFontWeight = theme.typography.titleWeight;

  return {
    h1: ({ children }) => (
      <h1
        style={{
          fontFamily: theme.typography.titleFamily,
          fontWeight: titleFontWeight,
          fontSize: 'var(--fs-h1)',
          lineHeight: 1.15,
          letterSpacing: theme.typography.letterSpacing,
          color: ink,
          marginBottom: 24,
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontFamily: theme.typography.titleFamily,
          fontWeight: titleFontWeight,
          fontSize: 'var(--fs-h2)',
          lineHeight: 1.3,
          letterSpacing: theme.typography.letterSpacing,
          color: ink,
          marginTop: 8,
          marginBottom: 20,
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontFamily: theme.typography.titleFamily,
          fontWeight: 700,
          fontSize: 'var(--fs-h3)',
          lineHeight: 1.35,
          color: ink,
          marginTop: 16,
          marginBottom: 12,
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        style={{
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh)',
          marginBottom: 12,
        }}
      >
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong
        style={{
          color: theme.tokens.accent,
          fontWeight: 800,
        }}
      >
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em style={{ color: theme.tokens.accent, fontStyle: 'normal', fontWeight: 600 }}>
        {children}
      </em>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        style={{
          color: theme.tokens.accent,
          textDecoration: 'underline',
          textDecorationThickness: '2px',
          textUnderlineOffset: '4px',
        }}
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh)',
          color: ink,
          paddingLeft: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh)',
          color: ink,
          paddingLeft: 0,
          counterReset: 'li',
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          marginTop: 8,
          marginBottom: 16,
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children, ordered }: any) => (
      <li
        style={{
          position: 'relative',
          paddingLeft: 40,
          counterIncrement: ordered ? 'li' : undefined,
        }}
      >
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            color: theme.tokens.accent,
            fontWeight: 700,
            ...(ordered
              ? {
                  content: 'counter(li)',
                }
              : {}),
          }}
        >
          {ordered ? null : '•'}
        </span>
        {ordered && (
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              color: theme.tokens.accent,
              fontWeight: 800,
            }}
          >
            {/* rendered via CSS counter */}
          </span>
        )}
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          background: 'var(--c-quote-bg)',
          padding: '24px 32px',
          margin: '12px 0',
          fontSize: 'var(--fs-body)',
          lineHeight: 'var(--lh)',
          color: 'var(--c-quote-ink)',
          borderRadius: 8,
          fontStyle: 'italic',
        }}
      >
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr
        style={{
          border: 'none',
          borderTop: `2px solid ${theme.tokens.divider}`,
          margin: '16px 0',
        }}
      />
    ),
    code: ({ inline, children, className }: any) => {
      if (inline) {
        return (
          <code
            className={className}
            style={{
              background: 'var(--c-code-bg)',
              color: 'var(--c-code-ink)',
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: '0.92em',
              fontFamily: 'ui-monospace,Menlo,Consolas,monospace',
            }}
          >
            {children}
          </code>
        );
      }
      return (
        <code
          className={className}
          style={{
            display: 'block',
            fontFamily: 'ui-monospace,Menlo,Consolas,monospace',
            fontSize: 22,
            lineHeight: 1.55,
            color: 'var(--c-code-ink)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {children}
        </code>
      );
    },
    pre: ({ children }) => (
      <pre
        style={{
          background: 'var(--c-code-bg)',
          padding: '24px 28px',
          borderRadius: 10,
          margin: '12px 0',
          overflow: 'hidden',
        }}
      >
        {children}
      </pre>
    ),
    table: ({ children }) => (
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: 26,
          marginTop: 12,
          marginBottom: 16,
        }}
      >
        {children}
      </table>
    ),
    th: ({ children }) => (
      <th
        style={{
          padding: '14px 16px',
          textAlign: 'left',
          fontWeight: 700,
          borderBottom: `2px solid ${theme.tokens.ink}`,
          color: ink,
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          padding: '14px 16px',
          borderBottom: `1px solid ${theme.tokens.divider}`,
          color: ink,
        }}
      >
        {children}
      </td>
    ),
  };
}
