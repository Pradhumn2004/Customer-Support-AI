import { useRef, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Trash2, Sparkles } from 'lucide-react';
import { INDUSTRIES } from '../data';
import { useChat } from '../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface ChatPageProps {
  industryId: string;
  darkMode: boolean;
  onBack: () => void;
}

export default function ChatPage({ industryId, darkMode, onBack }: ChatPageProps) {
  const industry = INDUSTRIES.find(i => i.id === industryId) || INDUSTRIES[0];
  const { messages, loading, sendMessage, clearMessages } = useChat(industryId);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestion = (text: string) => {
    sendMessage(text);
  };

  return (
    <div className={`min-h-screen flex flex-col ${
      darkMode ? 'bg-[#0b0c14] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${
        darkMode ? 'bg-[#0b0c14]/90 border-slate-800' : 'bg-white/90 border-slate-200'
      } backdrop-blur-md`}>
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              darkMode ? 'hover:bg-slate-800 text-gray-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold truncate">{industry.name} Support Agent</h1>
              <p className={`text-[10px] font-mono truncate ${darkMode ? 'text-gray-500' : 'text-slate-500'}`}>
                {industry.description}
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                darkMode ? 'hover:bg-slate-800 text-gray-400' : 'hover:bg-slate-100 text-slate-600'
              }`}
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto ${
        messages.length === 0 ? 'flex items-center justify-center' : ''
      }`}>
        {messages.length === 0 ? (
          <div className="w-full max-w-2xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/20">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1">Chat with {industry.name} Support</h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-slate-500'}`}>
                Ask anything about our {industry.name} solutions
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-lg mx-auto">
              {industry.suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestion(s)}
                  disabled={loading}
                  className={`text-xs text-left px-3 py-2.5 rounded-xl border transition-all cursor-pointer disabled:opacity-50 ${
                    darkMode
                      ? 'bg-slate-900/50 border-slate-800 text-gray-300 hover:bg-slate-800 hover:text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} darkMode={darkMode} />
            ))}
            <div ref={chatEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className={`border-t ${darkMode ? 'border-slate-800 bg-[#0b0c14]' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-3xl mx-auto">
          <ChatInput
            onSend={sendMessage}
            disabled={loading}
            darkMode={darkMode}
            placeholder={`Message ${industry.name} support...`}
          />
        </div>
      </div>
    </div>
  );
}
