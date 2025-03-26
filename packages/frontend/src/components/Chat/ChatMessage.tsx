import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface ChatMessageProps {
  message: string;
  isAI: boolean;
  timestamp?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isAI, timestamp }) => {
  // Configure marked to use syntax highlighting for code blocks
  marked.setOptions({
    highlight: (code, lang) => {
      return SyntaxHighlighter.highlight(code, {
        language: lang || 'text',
        style: atomDark,
      });
    },
  });

  // Parse legal citations
  const parseLegalCitations = (text: string) => {
    return text.replace(
      /([A-Za-z\s]+v\.\s[A-Za-z\s]+,\s+\d+\s+[A-Za-z.]+\s+\d+\s+\(\d{4}\))/g,
      '<a href="#" class="text-blue-500 hover:underline">$1</a>'
    );
  };

  // Process the message content
  const processMessage = (content: string) => {
    // First parse legal citations
    const withCitations = parseLegalCitations(content);
    // Then convert markdown and sanitize
    const html = DOMPurify.sanitize(marked(withCitations));
    return html;
  };

  return (
    <div
      className={`flex ${
        isAI ? 'justify-start' : 'justify-end'
      } mb-4`}
    >
      <div
        className={`max-w-3xl rounded-lg px-4 py-2 ${
          isAI
            ? 'bg-gray-100 text-gray-800'
            : 'bg-blue-500 text-white'
        }`}
      >
        <div
          className="prose prose-sm"
          dangerouslySetInnerHTML={{
            __html: processMessage(message),
          }}
        />
        {timestamp && (
          <div className="text-xs mt-1 text-gray-500">
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage; 