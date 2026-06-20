import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Eye, EyeOff, Lock, CheckCircle2,
  Database, UserCheck, Key, FileWarning, HelpCircle
} from 'lucide-react';

interface PrivacySectionProps {
  darkMode: boolean;
}

export default function PrivacySection({ darkMode }: PrivacySectionProps) {
  const [maskActive, setMaskActive] = useState<boolean>(true);
  const [activeParamTab, setActiveParamTab] = useState<'info' | 'audit' | 'gdpr'>('info');

  const clientData = {
    name: "Elena Rostova",
    email: "elena.rostova@techcorp.com",
    card: "4111 2920 1024 8829",
    apiKey: "sk-live_920haskdnz910h_vA82",
    query: "Need to re-route billing payout of $4,500.20 to account sk-9102."
  };

  return (
    <section className={`py-20 transition-all duration-300 relative overflow-hidden ${
      darkMode ? 'bg-[#0b0c14] text-[#f1f3f9]' : 'bg-slate-50 text-slate-900 border-t border-slate-100'
    }`} id="security">

      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="p-8 sm:p-12 md:p-16 rounded-[40px] bg-[#0c0d16] border border-slate-800 text-white relative overflow-hidden shadow-2xl">

          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[110px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold border border-blue-500/20">
                <ShieldCheck className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>Enterprise Grade Shield Standard</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Privacy-first AI for <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400">
                  Customer Service.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl font-normal">
                Give your customers absolute peace of mind. Our state-of-the-art compliance layers audit
                customer inquiries in real time, automatically stripping and masking PII, passwords,
                and private financial statements before dispatching values to LLM nodes.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#sandbox-input"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white text-xs font-semibold shadow-lg shadow-blue-500/20 inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 cursor-pointer"
                >
                  Configure Shield
                </a>
                <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  GDPR & HIPAA Compliant Direct
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-[#111221] border border-slate-800 p-5 sm:p-6 shadow-2xl relative">

                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold tracking-tight text-white leading-none">PII Sanitization Router</h4>
                      <span className="text-[9px] font-mono opacity-50 block leading-none mt-1">Status: active</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setMaskActive(!maskActive)}
                    className={`px-2.5 py-1 text-[10px] font-mono tracking-wider font-bold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                      maskActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/25'
                    }`}
                    id="pii-mask-toggle"
                  >
                    {maskActive ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        MASK ON
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        UNSAFE VIEW
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-3.5 text-xs font-mono">

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">CLIENT EMAIL:</label>
                    <div className="p-2 rounded bg-[#090a10] border border-slate-800/80 text-gray-200">
                      {maskActive ? (
                        <span>e••••••••@•••••••••.com <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1 py-0.2 rounded ml-1 font-sans">Anonymized</span></span>
                      ) : (
                        <span>{clientData.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">CREDIT CARD CREDENTIALS:</label>
                    <div className="p-2 rounded bg-[#090a10] border border-slate-800/80 text-gray-200">
                      {maskActive ? (
                        <span>•••• •••• •••• 8829 <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1 py-0.2 rounded ml-1 font-sans">PCI-DSS Encrypted</span></span>
                      ) : (
                        <span>{clientData.card}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">NESTED API KEY INGESTED:</label>
                    <div className="p-2 rounded bg-[#090a10] border border-slate-800/80 text-gray-200">
                      {maskActive ? (
                        <span>sk-live_••••••••••••••••• <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-1 py-0.2 rounded ml-1 font-sans">Redacted</span></span>
                      ) : (
                        <span>{clientData.apiKey}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500">ORIGINAL CUSTOMER TICKET QUERY SEND:</label>
                    <div className="p-2 rounded bg-[#090a10] border border-slate-800/80 text-[11px] leading-relaxed text-gray-300">
                      {maskActive ? (
                        <span>Need to re-route billing payout of <span className="text-[#a855f7] bg-[#a855f7]/10 px-1 py-0.5 rounded font-bold">[REDACTED_MONEY]</span> to account <span className="text-[#a855f7] bg-[#a855f7]/10 px-1 py-0.5 rounded font-bold">[REDACTED_REF_ID]</span>.</span>
                      ) : (
                        <span>{clientData.query}</span>
                      )}
                    </div>
                  </div>

                </div>

                <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-gray-400 pt-3 border-t border-slate-800/60">
                  <span>SSL connection: Active</span>
                  <span className="text-emerald-400 font-bold">SHA-256 Secured</span>
                </div>

              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 border-t border-slate-800/80 pt-12 text-left" id="privacy-benefits-row">

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2 font-bold tracking-tight text-white">
                <Database className="w-5 h-5 text-blue-500" />
                <h4>Secure system connection</h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-normal">
                Protect sensitive backend system resources and local databases. Our system uses localized tokenizers so no private business parameters ever bypass security.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2 font-bold tracking-tight text-white">
                <UserCheck className="w-5 h-5 text-indigo-500" />
                <h4>Complete AI oversight</h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-normal">
                Audit prompt histories, analyze raw input data vectors, and configure dynamic blacklists/allowlists of phrases matching compliance mandates.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2 font-bold tracking-tight text-white">
                <Key className="w-5 h-5 text-purple-500" />
                <h4>Data privacy by design</h4>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed font-normal">
                Strict zero data retention storage standard files policy. Customer data is processed transiently inside single-use sandboxed environments under fully audited guidelines.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
