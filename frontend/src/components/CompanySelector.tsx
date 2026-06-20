import React from 'react';
import { Terminal, Sparkles, ShoppingCart, TrendingUp, Heart, GraduationCap } from 'lucide-react';

interface CompanySelectorProps {
  selected: string;
  onSelect: (type: string) => void;
  accent?: string;
  theme?: 'dark' | 'light';
}

const companies = [
  { id: "tech", label: "Tech", subtitle: "SaaS", icon: Terminal, color: "#2563eb" },
  { id: "fashion", label: "Fashion", subtitle: "Retail", icon: Sparkles, color: "#ec4899" },
  { id: "shopping", label: "Shopping", subtitle: "E-commerce", icon: ShoppingCart, color: "#f59e0b" },
  { id: "finance", label: "Finance", subtitle: "Fintech", icon: TrendingUp, color: "#10b981" },
  { id: "healthcare", label: "Healthcare", subtitle: "Telemedicine", icon: Heart, color: "#ef4444" },
  { id: "education", label: "Education", subtitle: "E-learning", icon: GraduationCap, color: "#8b5cf6" },
];

export const CompanySelector: React.FC<CompanySelectorProps> = ({ selected, onSelect, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const textShadow = isDark ? '0 1px 4px rgba(0,0,0,0.5)' : 'none';

  return (
    <div style={{ textAlign: 'center', maxWidth: 520, width: '100%', animation: 'fadeIn 0.2s ease' }}>
      <p style={{
        fontSize: 22, fontWeight: 700, letterSpacing: '-0.4px',
        color: isDark ? '#fff' : '#000', margin: '0 0 4px', textShadow,
      }}>
        Welcome to AI Support
      </p>
      <p style={{
        fontSize: 14, fontWeight: 500,
        color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
        margin: '0 0 28px',
      }}>
        Select your company to get started
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, maxWidth: 480, margin: '0 auto' }}>
        {companies.map((c) => {
          const sel = selected === c.id;
          const Icon = c.icon;
          return (
            <button key={c.id} onClick={() => onSelect(c.id)}
              style={{
                padding: '16px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                background: sel
                  ? `linear-gradient(135deg, ${c.color}30, ${c.color}15)`
                  : isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)',
                color: sel ? '#fff' : isDark ? '#fff' : '#000',
                border: sel
                  ? `1px solid ${c.color}55`
                  : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                borderRadius: 12, cursor: 'pointer', fontSize: 13, fontWeight: sel ? 700 : 600,
                backdropFilter: 'blur(12px)', transition: 'all 0.15s',
                boxShadow: sel ? `0 0 20px ${c.color}25` : (isDark ? '0 2px 8px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.04)'),
              }}
              onMouseEnter={(e) => {
                if (!sel) { e.currentTarget.style.background = `${c.color}25`; e.currentTarget.style.borderColor = `${c.color}44`; }
              }}
              onMouseLeave={(e) => {
                if (!sel) { e.currentTarget.style.background = isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'; }
              }}
            >
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: sel ? `${c.color}30` : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={18} strokeWidth={1.5} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</span>
              <span style={{
                fontSize: 10, fontWeight: 500,
                color: sel ? 'rgba(255,255,255,0.6)' : isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
              }}>
                {c.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
