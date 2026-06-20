import React, { useState, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  accent?: string;
  theme?: 'dark' | 'light';
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled, accent = '#8b5cf6', theme = 'dark' }) => {
  const [input, setInput] = useState('');
  const isDark = theme === 'dark';
  const hasText = input.trim().length > 0;

  const handleSend = () => {
    if (input.trim() && !disabled) { onSend(input.trim()); setInput(''); }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <div style={{ padding: '10px 20px 16px', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
      <div style={{
        flex: 1, display: 'flex', alignItems: 'flex-end', gap: 8,
        background: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.7)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
        borderRadius: 12, padding: '8px 14px',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
      }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          style={{
            flex: 1, background: 'transparent', border: 'none', resize: 'none',
            fontSize: 13, fontFamily: 'inherit', outline: 'none',
            color: isDark ? '#fff' : '#000',
            minHeight: 20, maxHeight: 100, lineHeight: 1.5, fontWeight: 500,
          }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !hasText}
          style={{
            padding: '7px 16px',
            background: hasText ? `linear-gradient(135deg, ${accent}, #7c3aed)` : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'),
            color: hasText ? '#fff' : (isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)'),
            border: 'none', borderRadius: 9,
            cursor: hasText ? 'pointer' : 'not-allowed',
            fontWeight: 700, fontSize: 12, letterSpacing: '0.3px',
            transition: 'all 0.15s', whiteSpace: 'nowrap',
            boxShadow: hasText ? `0 3px 12px ${accent}33` : 'none',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
