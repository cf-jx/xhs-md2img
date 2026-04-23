import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'XHS · Type Studio',
  description: 'Markdown set in type — 小红书图文编辑',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Gloock&family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Noto+Serif+SC:wght@400;500;700;900&family=Ma+Shan+Zheng&family=JetBrains+Mono:wght@400;500;700&family=LXGW+WenKai:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
