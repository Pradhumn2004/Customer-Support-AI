import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IndustrySelector from './components/IndustrySelector';
import KeyFeatures from './components/KeyFeatures';
import HowItWorks from './components/HowItWorks';
import PrivacySection from './components/PrivacySection';
import Footer from './components/Footer';
import ChatPage from './components/ChatPage';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [page, setPage] = useState<'landing' | 'chat'>('landing');
  const [chatIndustryId, setChatIndustryId] = useState<string>('saas');

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.style.backgroundColor = '#0b0c14';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f8fafc';
    }
  }, [darkMode]);

  const startChat = (industryId: string) => {
    setChatIndustryId(industryId);
    setPage('chat');
  };

  if (page === 'chat') {
    return <ChatPage industryId={chatIndustryId} darkMode={darkMode} onBack={() => setPage('landing')} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      darkMode ? 'bg-[#0b0c14] text-white selection:bg-purple-500/30' : 'bg-slate-50 text-slate-800 selection:bg-indigo-500/20'
    }`} id="app-root-container">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main id="main-content-flow">
        <Hero
          darkMode={darkMode}
          onSelectIndustry={(id) => {
            startChat(id);
          }}
        />
        <IndustrySelector
          darkMode={darkMode}
          onStartChat={startChat}
        />
        <KeyFeatures darkMode={darkMode} />
        <HowItWorks darkMode={darkMode} />
        <PrivacySection darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
