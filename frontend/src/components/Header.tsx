import { useState, useEffect } from 'react';
import { Brain, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      darkMode ? 'bg-[#0b0c14]/85 backdrop-blur-md border-b border-gray-800/50' : 'bg-white/85 backdrop-blur-md border-b border-gray-100'
    }`} id="main-header">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">

        <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity" id="logo-container">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20" id="logo-icon">
            <Brain className="w-5.5 h-5.5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold tracking-tight text-lg leading-none ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              AI Support
            </span>
            <span className={`text-[10px] font-mono tracking-wider uppercase opacity-60 ${
              darkMode ? 'text-gray-400' : 'text-slate-500'
            }`}>
              Next-Gen Copilot
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['Solutions', 'Features', 'How It Works', 'Integrations', 'Security'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className={`transition-colors relative py-2 group ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {link}
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full`} />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">

          <div
            onClick={() => setDarkMode(!darkMode)}
            className={`cursor-pointer flex items-center p-1 rounded-full transition-all duration-300 w-16 h-8 relative ${
              darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-slate-100 border border-slate-200'
            }`}
            title="Toggle color theme"
            id="theme-toggler"
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={`absolute top-0.5 bottom-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md bg-white`}
              style={{
                left: darkMode ? 'calc(50% + 4px)' : '4px'
              }}
            >
              {darkMode ? (
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              )}
            </motion.div>

            <div className="flex justify-between w-full px-2 text-[10px] select-none text-gray-400">
              <Sun className={`w-3.5 h-3.5 ${darkMode ? 'opacity-30' : 'opacity-100 text-amber-500'}`} />
              <Moon className={`w-3.5 h-3.5 ${darkMode ? 'opacity-100 text-slate-300' : 'opacity-30'}`} />
            </div>
          </div>

          <a
            href="#demo"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 hover:brightness-110 active:scale-95 transition-all"
            id="header-cta"
          >
            Request Demo
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

        </div>
      </div>
    </header>
  );
}
