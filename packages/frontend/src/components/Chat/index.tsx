'use client';

import { useState } from 'react';
import { sendMessage } from '../../services/api';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import LoadingIndicator from './LoadingIndicator';
import MessageFormatter from './MessageFormatter';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function Chat() {
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
      
      // 意図的な遅延を追加してローディング状態を表示
      await new Promise(resolve => setTimeout(resolve, 500));
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
      
    } catch (error) {
      console.error('Chat error:', error);
      // エラーメッセージを表示
      const errorMessage = {
        id: Date.now().toString(),
        text: 'Sorry, there was an error processing your request. Please try again.',
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
