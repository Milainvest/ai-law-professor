'use client';

import { Message } from './index';
import MessageFormatter from './MessageFormatter';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const getMessageStyle = (sender: 'user' | 'ai') => {
    const baseStyle = 'max-w-3/4 p-3 rounded-lg';
    const senderStyle = sender === 'user'
      ? 'bg-blue-100 text-blue-900'
      : 'bg-gray-100 text-gray-900';
    
    return `${baseStyle} ${senderStyle}`;
  };

  const getContainerStyle = (sender: 'user' | 'ai') => {
    return `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
  };

  return (
    <div className={getContainerStyle(message.sender)}>
      <div className={getMessageStyle(message.sender)}>
        <MessageFormatter content={message.text} />
      </div>
    </div>
  );
}
