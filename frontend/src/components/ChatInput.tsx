import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
  darkMode: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, darkMode, placeholder }: ChatInputProps) {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [text]);

  const handleSubmit = () => {
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={`flex items-end gap-2 p-3 border-t ${
      darkMode ? 'border-slate-800 bg-[#0b0c14]' : 'border-slate-200 bg-white'
    }`}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Type your message...'}
        rows={1}
        className={`flex-1 resize-none text-sm rounded-xl px-4 py-2.5 outline-none max-h-[120px] ${
          darkMode
            ? 'bg-[#1a1b2e] text-white placeholder-gray-500 border border-slate-800'
            : 'bg-slate-100 text-slate-900 placeholder-gray-400 border border-slate-200'
        }`}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !text.trim()}
        className="w-10 h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed shrink-0"
      >
        <Send className="w-4 h-4 text-white" />
      </button>
    </div>
  );
}
