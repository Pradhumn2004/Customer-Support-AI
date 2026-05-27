import React, { useState, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      padding: '16px 24px',
      background: '#fff',
      borderTop: '1px solid #e0e0e0',
      display: 'flex',
      gap: 12
    }}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        rows={1}
        style={{
          flex: 1,
          padding: '12px 16px',
          border: '1px solid #e0e0e0',
          borderRadius: 8,
          resize: 'none',
          fontSize: 14,
          fontFamily: 'inherit',
          outline: 'none',
          minHeight: 24,
          maxHeight: 120
        }}
      />
      <button
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        style={{
          padding: '12px 24px',
          background: input.trim() ? '#1a1a2e' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          cursor: input.trim() ? 'pointer' : 'not-allowed',
          fontWeight: 600,
          fontSize: 14
        }}
      >
        Send
      </button>
    </div>
  );
};
