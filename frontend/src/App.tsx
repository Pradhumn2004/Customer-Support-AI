import React, { useState, useRef, useEffect } from 'react';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { FileUploader } from './components/FileUploader';
import { useChat } from './hooks/useChat';

const App: React.FC = () => {
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);
  const { messages, loading, sendMessage, uploadFile } = useChat(sessionId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{
      maxWidth: 900,
      margin: '0 auto',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: '#f5f5f5'
    }}>
      <header style={{
        padding: '16px 24px',
        background: '#1a1a2e',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: 20 }}>AI Customer Support</h1>
        <FileUploader onUpload={uploadFile} />
      </header>

      <ChatWindow messages={messages} loading={loading} onSuggestionClick={sendMessage} />
      <div ref={messagesEndRef} />

      <MessageInput onSend={sendMessage} disabled={loading} />
    </div>
  );
};

export default App;
