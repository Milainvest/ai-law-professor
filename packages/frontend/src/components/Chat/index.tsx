'use client';

import { useState } from 'react';
import { sendMessage } from '../../services/api';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import { LoadingIndicator } from './LoadingIndicator';
import MessageFormatter from './MessageFormatter';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (text: string) => {
    try {
      const newUserMessage = {
        id: Date.now().toString(),
        text,
        sender: 'user' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      setIsLoading(true);
      
      const response = await sendMessage(text);
      
      if (response?.answer) {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: response.answer,
          sender: 'ai' as const,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }
      
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorText = error.response?.status === 429 
        ? 'Too many requests. Please wait a moment before trying again.'
        : error.response?.status === 503
        ? 'AI service is currently unavailable. Please try again later.'
        : error.response?.data?.detail || 'An error occurred while processing your request. Please try again.';

      const errorMessage = {
        id: Date.now().toString(),
        text: errorText,
        sender: 'ai' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatMessages messages={messages} formatter={MessageFormatter} />
      {isLoading && <LoadingIndicator />}
      <ChatInput onSend={handleSend} disabled={isLoading} />
    </div>
  );
}
