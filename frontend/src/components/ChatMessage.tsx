import { Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  darkMode: boolean;
}

export default function ChatMessage({ role, content, darkMode }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        isUser
          ? 'bg-indigo-500'
          : darkMode ? 'bg-slate-700' : 'bg-slate-200'
      }`}>
        {isUser ? (
          <span className="text-white text-xs font-bold">U</span>
        ) : (
          <Sparkles className="w-4 h-4 text-indigo-400" />
        )}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
        isUser
          ? 'bg-indigo-500 text-white rounded-tr-md'
          : darkMode
            ? 'bg-[#1a1b2e] text-gray-200 rounded-tl-md'
            : 'bg-slate-100 text-slate-800 rounded-tl-md'
      }`}>
        {isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : content ? (
          <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        )}
      </div>
    </div>
  );
}
