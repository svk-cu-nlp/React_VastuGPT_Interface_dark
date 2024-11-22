import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Sidebar } from './components/Sidebar';
import { useTheme } from './hooks/useTheme';

// Sample data
const initialChats = [
  {
    id: '1',
    title: 'Website Development',
    preview: 'How do I create a responsive layout?',
    timestamp: new Date(),
  },
  {
    id: '2',
    title: 'React Hooks',
    preview: 'Can you explain useEffect?',
    timestamp: new Date(),
  },
];

const initialMessages = [
  {
    id: '1',
    content: 'Hello! How can I help you today?',
    role: 'assistant' as const,
    timestamp: new Date(),
  },
];

function App() {
  const [chats] = useState(initialChats);
  const [activeChat, setActiveChat] = useState<string | null>('1');
  const [messages, setMessages] = useState(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      role: 'user' as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = {
        id: String(messages.length + 2),
        content: 'This is a simulated response. In a real application, this would be connected to an AI backend.',
        role: 'assistant' as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onSelectChat={setActiveChat}
        onNewChat={() => {
          console.log('New chat');
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="p-6">
              <div className="flex gap-2 items-center text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        <ChatInput onSend={handleSendMessage} disabled={isTyping} />
      </main>
    </div>
  );
}

export default App;