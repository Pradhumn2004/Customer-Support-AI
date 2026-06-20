import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { BubbleBackground } from './components/animate-ui/components/backgrounds/bubble';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { CompanySelector } from './components/CompanySelector';
import { useChat } from './hooks/useChat';
import { Sun, Moon, Sparkles } from 'lucide-react';

type Theme = 'dark' | 'light';
interface ThemeCtx { theme: Theme; toggle: () => void }
const ThemeContext = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} });
export const useTheme = () => useContext(ThemeContext);

const companyColors: Record<string, string> = {
  tech: '#2563eb', fashion: '#ec4899', shopping: '#f59e0b',
  finance: '#10b981', healthcare: '#ef4444', education: '#8b5cf6',
};

const App: React.FC = () => {
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`);
  const [companyType, setCompanyType] = useState('');
  const [theme, setTheme] = useState<Theme>('dark');
  const { messages, loading, sendMessage, clearMessages } = useChat(sessionId);
  const chatRef = useRef<HTMLDivElement>(null);
  const accent = companyType ? companyColors[companyType] || '#2563eb' : '#8b5cf6';

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const handleSend = (msg: string) => { if (companyType) sendMessage(msg, companyType); };
  const handleCompanySelect = (type: string) => { setCompanyType(type); clearMessages(); };

  const isDark = theme === 'dark';
  const bgGrad = isDark ? 'from-violet-950 to-blue-950' : 'from-sky-50 via-indigo-50 to-white';
  const colors = isDark
    ? { first: '59,130,246', second: '168,85,247', third: '34,211,238', fourth: '239,68,68', fifth: '250,204,21', sixth: '168,85,247' }
    : { first: '99,102,241', second: '236,72,153', third: '6,182,212', fourth: '251,146,60', fifth: '34,197,94', sixth: '168,85,247' };
  const textShadow = isDark ? '0 1px 4px rgba(0,0,0,0.4)' : 'none';

  return (
    <ThemeContext.Provider value={{ theme, toggle: toggleTheme }}>
      <BubbleBackground interactive className={`w-screen h-screen ${bgGrad}`} colors={colors}>
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 100%)'
            : 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          color: isDark ? '#fff' : '#000',
          fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
          fontSize: 14,
        }}>
          <div style={{
            padding: '12px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            maxWidth: 900, width: '100%', margin: '0 auto',
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: `linear-gradient(135deg, ${accent}, #a855f7)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Sparkles size={14} color="#fff" strokeWidth={2} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.3px', textShadow }}>AI Support</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={toggleTheme}
                style={{
                  padding: '6px', display: 'flex',
                  background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                  color: isDark ? '#fff' : '#000',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 8, cursor: 'pointer',
                  backdropFilter: 'blur(8px)', transition: 'all 0.15s',
                }}
              >
                {isDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              {companyType && (
                <button onClick={() => setCompanyType('')}
                  style={{
                    padding: '5px 12px', fontSize: 12, fontWeight: 600,
                    background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                    color: isDark ? '#fff' : '#000',
                    borderRadius: 8, cursor: 'pointer',
                    backdropFilter: 'blur(8px)', transition: 'all 0.15s',
                  }}
                >
                  Change
                </button>
              )}
            </div>
          </div>

          <div ref={chatRef} style={{
            flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column',
            maxWidth: 900, width: '100%', margin: '0 auto', minHeight: 0,
          }}>
            {!companyType ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
                <CompanySelector selected={companyType} onSelect={handleCompanySelect} accent={accent} theme={theme} />
              </div>
            ) : (
              <ChatWindow
                messages={messages} loading={loading}
                companyType={companyType} accent={accent} theme={theme}
                onSuggestionClick={handleSend}
              />
            )}
          </div>

          {companyType && (
            <div style={{ flexShrink: 0, maxWidth: 900, width: '100%', margin: '0 auto' }}>
              <MessageInput onSend={handleSend} disabled={loading} accent={accent} theme={theme} />
            </div>
          )}
        </div>
      </BubbleBackground>
    </ThemeContext.Provider>
  );
};

export default App;
