'use client';
import { useState } from 'react';
import { sendMessage } from '../../services/api';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (text: string) => {
    try {
      const newUserMessage = {
        id: Date.now().toString(),
        text,
        sender: 'user' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      
      const response = await sendMessage(text);
      
      const aiMessage = {
        id: Date.now().toString(),
        text: response.answer,
        sender: 'ai' as const,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
