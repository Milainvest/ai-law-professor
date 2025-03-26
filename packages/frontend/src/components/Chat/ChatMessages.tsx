'use client';
import { useEffect, useRef, useState } from 'react';
import { checkHealth } from '../../services/api';
import type { Message } from './index';
import type { FC } from 'react';
import type { MessageFormatterProps } from './MessageFormatter';

interface ChatMessagesProps {
  messages: Message[];
  formatter?: FC<MessageFormatterProps>;
}

export default function ChatMessages({ messages, formatter: Formatter }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isConnected, setIsConnected] = useState(false);

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
      } catch (error) {
        console.error('API connection failed:', error);
        setIsConnected(false);
      }
    };

    verifyConnection();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 prose prose-sm max-w-none">
      {!isConnected && (
        <div className="text-red-500 p-2 bg-red-50 rounded">
          Warning: Unable to connect to AI service
        </div>
      )}

      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Start chatting with the AI Law Professor
        </div>
      ) : (
        messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-3/4 p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-blue-100 text-blue-900' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              {Formatter ? (
                <Formatter content={message.text} />
              ) : (
                message.text
              )}
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
