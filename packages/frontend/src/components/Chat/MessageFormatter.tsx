'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { Components } from 'react-markdown';

export interface MessageFormatterProps {
  content: string;
}

export default function MessageFormatter({ content }: MessageFormatterProps) {
  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[]}
        rehypePlugins={[]}
        components={{
          // @ts-ignore - react-markdownの型定義の問題を回避
          // カスタムコードブロックのレンダリング
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                // @ts-ignore - react-syntax-highlighterの型定義の問題を回避
                language={match[1]}
                style={vs}
                PreTag="div"
                className="rounded-md !bg-gray-50 !mt-2"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // 法的引用のカスタムスタイリング
          blockquote({ node, children, ...props }) {
            return (
              <blockquote
                className="border-l-4 border-blue-500 pl-4 my-4 italic bg-gray-50 p-3 rounded"
                {...props}
              >
                {children}
              </blockquote>
            );
          },
          // 重要な部分の強調
              em({ node, children, ...props }) {
                return (
                  <em className="italic text-blue-600" {...props}>
                    {children}
                  </em>
                );
              },
              h1({ node, children, ...props }) {
                return (
                  <h1 className="text-2xl font-bold mt-4 mb-2" {...props}>
                    {children}
                  </h1>
                );
              },
              h2({ node, children, ...props }) {
                return (
                  <h2 className="text-xl font-bold mt-3 mb-2" {...props}>
                    {children}
                  </h2>
                );
              }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
