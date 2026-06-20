import React, { useState } from 'react';
import {
  Brain, Send, Github, Twitter, Linkedin, MessageSquareCode,
  ShieldCheck, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const [emailValue, setEmailValue] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailValue.trim()) return;
    setSignedUp(true);
    setTimeout(() => {
      setEmailValue('');
    }, 2000);
  };

  return (
    <footer className={`pt-20 pb-12 transition-all duration-500 border-t ${
      darkMode ? 'bg-[#06070a] border-slate-900 text-gray-400' : 'bg-slate-900 border-slate-800 text-slate-300'
    }`} id="footer-section">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-gray-800" id="footer-upper-grid">

          <div className="col-span-2 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white tracking-tight">AI Support</span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm">
              Deploying secure, sovereign, multi-model support agents preloaded with strict regulatory credentials
              and deep catalog indexing capabilities.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 transition-all flex items-center justify-center text-white cursor-pointer" title="Twitter handle">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 transition-all flex items-center justify-center text-white cursor-pointer" title="LinkedIn page">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-violet-600 transition-all flex items-center justify-center text-white cursor-pointer" title="GitHub projects">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="text-left space-y-3">
            <h5 className="text-xs font-mono font-bold tracking-widest text-white uppercase">Solutions</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#solutions" className="hover:text-white transition-colors">SaaS Agent</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Fashion Styling</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Fintech Audit</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Telemedicine Ingest</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">E-commerce Sync</a></li>
            </ul>
          </div>

          <div className="text-left space-y-3">
            <h5 className="text-xs font-mono font-bold tracking-widest text-white uppercase">Resources</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Model Documentation</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">API Reference Guide</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Privacy Shields</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Status Logs</a></li>
              <li><a href="#integrations" className="hover:text-white transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          <div className="text-left space-y-3">
            <h5 className="text-xs font-mono font-bold tracking-widest text-white uppercase">Legal</h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#security" className="hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Audit Statements</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">GDPR compliance</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">HIPAA checklist</a></li>
            </ul>
          </div>

          <div className="text-left space-y-3 col-span-2 md:col-span-1">
            <h5 className="text-xs font-mono font-bold tracking-widest text-white uppercase">Newsletter Signup</h5>
            <p className="text-[11px] leading-relaxed">Receive bi-weekly security blueprints and model diagnostics logs.</p>

            <form onSubmit={handleSignup} className="space-y-2" id="footer-newsletter-form">
              <div className="relative">
                <input
                  type="email"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                  placeholder="Enter email..."
                  required
                  className="w-full text-xs p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-1 focus:ring-violet-500 pr-9"
                  id="newsletter-email-input"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-2.5 rounded-md bg-[#a855f7] hover:brightness-110 text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Subscribe"
                  id="newsletter-submit-btn"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>

              <AnimatePresence>
                {signedUp && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-mono font-medium"
                    id="newsletter-success-badge"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Securely subscribed!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500" id="footer-bottom-row">

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded bg-emerald-500" />
            <span>Systems Online. Live secure model routing active.</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} AI Support Inc. All Rights Reserved.</span>
          </div>

        </div>

        <div className="mt-12 select-none select-none opacity-5 flex items-center justify-center gap-2" aria-hidden="true" id="branding-footer-watermark">
          <Brain className="w-16 h-16 text-white" />
          <span className="text-5xl sm:text-7xl font-extrabold tracking-widest text-white uppercase font-sans">
            AI Support
          </span>
        </div>

      </div>
    </footer>
  );
}
