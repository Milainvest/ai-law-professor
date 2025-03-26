'use client';
import { useEffect, useRef, useState } from 'react';
import { checkHealth } from '../../services/api';
import type { Message } from './index';
import type { FC } from 'react';
import type { MessageFormatterProps } from './MessageFormatter';
import { MessageItem } from './MessageItem';
import { LoadingIndicator } from './LoadingIndicator';

interface ChatMessagesProps {
  messages: Message[];
  formatter?: FC<MessageFormatterProps>;
}

export default function ChatMessages({ messages, formatter: Formatter }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [errorType, setErrorType] = useState<'connection' | 'service' | 'timeout' | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const verifyConnection = async () => {
      try {
        await checkHealth();
        setIsConnected(true);
        setErrorType(null);
      } catch (error) {
        setIsConnected(false);
        if (error instanceof TypeError) {
          setErrorType('connection');
        } else if (error.code === 'TIMEOUT') {
          setErrorType('timeout');
        } else {
          setErrorType('service');
        }
      }
    };

    verifyConnection();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 prose prose-sm max-w-none">
      {!isConnected && (
        <div className="text-red-500 p-2 bg-red-50 rounded">
          {errorType === 'connection' && 'Unable to reach the AI service. Please check your internet connection.'}
          {errorType === 'timeout' && 'The AI service is taking too long to respond. Please try again.'}
          {errorType === 'service' && 'The AI service is currently unavailable. Please try again later.'}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Start chatting with the AI Law Professor
        </div>
      ) : (
        messages.map((message) => (
          <MessageItem 
            key={message.id}
            message={message}
            formatter={Formatter}
          />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
