import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  MessageCircle, Sparkles, Terminal, ShoppingCart, TrendingUp, Heart, GraduationCap,
  KeyRound, RotateCcw, RefreshCw, Ruler, Package, ArrowLeftRight, Wallet, CreditCard,
  Calendar, Shield, BookOpen, FileText, Award,
} from 'lucide-react';

interface Message { role: 'user' | 'assistant' | 'system'; content: string }

interface ChatWindowProps {
  messages: Message[];
  loading: boolean;
  companyType?: string;
  accent?: string;
  theme?: 'dark' | 'light';
  onSuggestionClick?: (q: string) => void;
}

const suggestionIcons: Record<string, React.ReactNode[]> = {
  tech: [<KeyRound key={0} size={14} strokeWidth={1.5} />, <RotateCcw key={1} size={14} strokeWidth={1.5} />, <RefreshCw key={2} size={14} strokeWidth={1.5} />],
  fashion: [<RotateCcw key={0} size={14} strokeWidth={1.5} />, <Ruler key={1} size={14} strokeWidth={1.5} />, <Package key={2} size={14} strokeWidth={1.5} />],
  shopping: [<Package key={0} size={14} strokeWidth={1.5} />, <ArrowLeftRight key={1} size={14} strokeWidth={1.5} />, <Wallet key={2} size={14} strokeWidth={1.5} />],
  finance: [<Wallet key={0} size={14} strokeWidth={1.5} />, <CreditCard key={1} size={14} strokeWidth={1.5} />, <Calendar key={2} size={14} strokeWidth={1.5} />],
  healthcare: [<Calendar key={0} size={14} strokeWidth={1.5} />, <Shield key={1} size={14} strokeWidth={1.5} />, <Heart key={2} size={14} strokeWidth={1.5} />],
  education: [<BookOpen key={0} size={14} strokeWidth={1.5} />, <FileText key={1} size={14} strokeWidth={1.5} />, <Award key={2} size={14} strokeWidth={1.5} />],
};

const SUGGESTIONS: Record<string, string[]> = {
  tech: ["Reset password", "Refund policy", "Upgrade plan"],
  fashion: ["Return policy", "Size guides", "Track order"],
  shopping: ["Track order", "Return item", "Payment methods"],
  finance: ["Check balance", "Apply loan", "Transactions"],
  healthcare: ["Book appointment", "Refill prescription", "Insurance"],
  education: ["Enroll course", "Refund policy", "Certificate"],
};

const companyIcons: Record<string, React.ReactNode> = {
  tech: <Terminal size={26} strokeWidth={1.5} />,
  fashion: <Sparkles size={26} strokeWidth={1.5} />,
  shopping: <ShoppingCart size={26} strokeWidth={1.5} />,
  finance: <TrendingUp size={26} strokeWidth={1.5} />,
  healthcare: <Heart size={26} strokeWidth={1.5} />,
  education: <GraduationCap size={26} strokeWidth={1.5} />,
};

export const ChatWindow: React.FC<ChatWindowProps> = ({
  messages, loading, companyType, accent = '#8b5cf6', theme = 'dark', onSuggestionClick,
}) => {
  const isDark = theme === 'dark';
  const suggestions = companyType ? SUGGESTIONS[companyType] || SUGGESTIONS.tech : [];
  const icons = companyType ? suggestionIcons[companyType] || suggestionIcons.tech : [];
  const headerIcon = companyType ? companyIcons[companyType] || <MessageCircle size={26} strokeWidth={1.5} /> : <MessageCircle size={26} strokeWidth={1.5} />;
  const textShadow = isDark ? '0 1px 3px rgba(0,0,0,0.5)' : 'none';

  return (
    <div style={{ padding: '16px 20px 8px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
      {messages.length === 0 && suggestions.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '8%', animation: 'fadeIn 0.2s ease' }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', color: accent, backdropFilter: 'blur(8px)',
          }}>
            {headerIcon}
          </div>
          <p style={{
            fontSize: 20, fontWeight: 700, letterSpacing: '-0.4px',
            color: isDark ? '#fff' : '#000', margin: '0 0 4px', textShadow,
          }}>
            How can I help?
          </p>
          <p style={{
            fontSize: 13, fontWeight: 500,
            color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
            margin: '0 0 20px',
          }}>
            Choose a question or type your own
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 320, margin: '0 auto' }}>
            {suggestions.map((q, i) => (
              <button key={q} onClick={() => onSuggestionClick?.(q)}
                style={{
                  padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8,
                  background: isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.7)',
                  color: isDark ? '#fff' : '#000',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  backdropFilter: 'blur(12px)', transition: 'all 0.15s',
                  textAlign: 'left', width: '100%',
                  boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = `${accent}30`; e.currentTarget.style.borderColor = `${accent}55`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = isDark ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'; }}
              >
                <span style={{ opacity: 0.7 }}>{icons[i]}</span>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {messages.map((msg, idx) => (
        <div key={idx} style={{
          alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
          maxWidth: '78%', padding: '10px 16px',
          borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
          background: msg.role === 'user'
            ? `linear-gradient(135deg, ${accent}, #7c3aed)`
            : isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
          color: msg.role === 'user' ? '#fff' : isDark ? '#fff' : '#000',
          backdropFilter: 'blur(16px)',
          border: msg.role === 'assistant' ? `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.3)'}` : 'none',
          lineHeight: 1.5, fontSize: 13, fontWeight: 500,
          boxShadow: msg.role === 'user' ? `0 3px 12px ${accent}25` : `0 2px 8px ${isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.04)'}`,
          animation: 'fadeIn 0.2s ease',
          textShadow: msg.role === 'user' ? '0 1px 2px rgba(0,0,0,0.2)' : 'none',
        }}>
          <ReactMarkdown>{msg.content}</ReactMarkdown>
        </div>
      ))}

      {loading && messages[messages.length - 1]?.role !== 'assistant' && (
        <div style={{
          alignSelf: 'flex-start', padding: '12px 16px',
          background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.7)',
          borderRadius: '14px 14px 14px 4px',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.3)'}`,
          display: 'flex', gap: 4,
        }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              width: 6, height: 6, borderRadius: '50%', background: accent,
              animation: `pulse 1s infinite ${i * 0.15}s`, opacity: 0.8,
            }} />
          ))}
        </div>
      )}
    </div>
  );
};
