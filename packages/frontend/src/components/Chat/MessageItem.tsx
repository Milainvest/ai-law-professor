import type { FC } from 'react';
import type { Message } from './index';
import type { MessageFormatterProps } from './MessageFormatter';

interface MessageItemProps {
  message: Message;
  formatter?: FC<MessageFormatterProps>;
}

export const MessageItem: FC<MessageItemProps> = ({ message, formatter: Formatter }) => {
  const isUserMessage = message.sender === 'user';
  
  return (
    <div 
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-3/4 p-3 rounded-lg ${
        isUserMessage 
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
  );
};