import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: string[];
  timestamp?: string;
}

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  onSuggestionClick?: (question: string) => void;
}

const suggestions = [
  "How do I reset my password?",
  "What is your refund policy?",
  "What payment methods do you accept?",
  "How do I cancel my subscription?",
  "What is the status of my order?",
  "I'm having trouble logging in"
];

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, loading, onSuggestionClick }) => {
  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }}>
      {messages.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#666',
          marginTop: '15%',
          fontSize: 16
        }}>
          <p style={{ fontSize: 24, marginBottom: 8 }}>How can I help you today?</p>
          <p style={{ marginBottom: 24 }}>Ask me anything about our products, orders, or account</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            maxWidth: 500,
            margin: '0 auto'
          }}>
            {suggestions.map((q) => (
              <button
                key={q}
                onClick={() => onSuggestionClick?.(q)}
                style={{
                  padding: '10px 18px',
                  background: '#fff',
                  border: '1px solid #d0d0d0',
                  borderRadius: 20,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#333',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1a1a2e';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#1a1a2e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.color = '#333';
                  e.currentTarget.style.borderColor = '#d0d0d0';
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '75%',
            padding: '12px 16px',
            borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            background: msg.role === 'user' ? '#1a1a2e' : '#fff',
            color: msg.role === 'user' ? '#fff' : '#333',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            lineHeight: 1.5
          }}
        >
          <ReactMarkdown>{msg.content}</ReactMarkdown>
          {msg.sources && msg.sources.length > 0 && (
            <div style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: '1px solid #eee',
              fontSize: 12,
              color: '#888'
            }}>
              Sources: {msg.sources.join(', ')}
            </div>
          )}
        </div>
      ))}

      {loading && (
        <div style={{
          alignSelf: 'flex-start',
          padding: '12px 16px',
          background: '#fff',
          borderRadius: '16px 16px 16px 4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'flex',
          gap: 4
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#999', animation: 'pulse 1.4s infinite'
          }} />
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#999', animation: 'pulse 1.4s infinite 0.2s'
          }} />
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#999', animation: 'pulse 1.4s infinite 0.4s'
          }} />
        </div>
      )}
    </div>
  );
};
