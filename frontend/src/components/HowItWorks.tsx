import { useState } from 'react';
import { STEPS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import {
  Link, Sparkles, Zap, ArrowRight, CheckCircle2,
  RefreshCcw, ShieldAlert, CheckSquare
} from 'lucide-react';

interface HowItWorksProps {
  darkMode: boolean;
}

export default function HowItWorks({ darkMode }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const renderIcon = (iconName: string, stepNum: number) => {
    const isCurrent = activeStep === stepNum;
    const commonClass = `w-6 h-6 transition-transform duration-300 ${
      isCurrent ? 'scale-110 text-white' : 'text-slate-400'
    }`;
    switch (iconName) {
      case 'Link': return <Link className={commonClass} />;
      case 'Sparkles': return <Sparkles className={commonClass} />;
      case 'Zap': return <Zap className={commonClass} />;
      default: return <Link className={commonClass} />;
    }
  };

  return (
    <section className={`py-20 relative transition-all duration-300 overflow-hidden ${
      darkMode ? 'bg-[#0b0c14] text-[#f1f3f9]' : 'bg-white text-slate-900 border-t border-slate-100'
    }`} id="how-it-works">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            id="how-it-works-heading"
          >
            How It Works
          </motion.h2>
          <p className={`mt-4 text-sm leading-relaxed ${
            darkMode ? 'text-gray-400' : 'text-slate-500'
          }`}>
            Three straightforward stages to configure, customize, audit and launch your autonomous 24/7 client assistant.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative" id="steps-pipeline-row">

          {STEPS.map((step, idx) => {
            const isClickableActive = activeStep === step.number;
            return (
              <motion.div
                key={step.number}
                onClick={() => setActiveStep(step.number)}
                whileHover={{ y: -4 }}
                className={`p-6 sm:p-8 rounded-3xl border text-left cursor-pointer transition-all duration-300 relative ${
                  isClickableActive
                    ? 'bg-gradient-to-tr from-[#161726] to-[#0f101d] border-violet-500/80 shadow-xl shadow-violet-500/10 text-white'
                    : darkMode
                      ? 'bg-[#12131f]/60 border-slate-800/80 hover:border-slate-700/80'
                      : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:shadow-sm'
                }`}
              >
                <span className={`absolute top-6 right-8 text-5xl font-extrabold select-none opacity-5 tracking-tight font-sans`}>
                  {step.number}
                </span>

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isClickableActive
                      ? 'bg-gradient-to-tr from-violet-600 to-indigo-600 shadow-md shadow-violet-500/20'
                      : darkMode ? 'bg-[#0f111a]' : 'bg-slate-100'
                  }`}>
                    {renderIcon(step.iconName, step.number)}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-wider text-violet-500 font-bold uppercase">Stage 0{step.number}</span>
                    <h3 className={`text-base font-bold tracking-tight ${
                      isClickableActive ? 'text-white' : darkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className={`mt-4 text-xs leading-relaxed opacity-85 ${
                  isClickableActive ? 'text-gray-300' : darkMode ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {step.description}
                </p>

                {idx < 2 && (
                  <div className="hidden lg:flex absolute -right-4 top-[35%] -mr-1 z-20" aria-hidden="true">
                    <ArrowRight className={`w-4 h-4 ${isClickableActive ? 'text-violet-500 animate-pulse' : 'text-slate-500/30'}`} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12" id="step-active-flow-simulator">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.3 }}
              className={`p-6 sm:p-8 rounded-3xl border ${
                darkMode ? 'bg-[#10111d] border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {activeStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">Step 1: Connecting Client Context Streams</h4>
                    <p className="text-xs leading-relaxed opacity-85">
                      Securely mount databases, files, directories, Markdown documentation pages, or Zendesk chat history. Files are broken down into granular semantic chunks and safely stored inside private vector directories.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <span className="px-2.5 py-1 rounded bg-[#0b0c14] border border-slate-800">SupportDocs.pdf</span>
                      <span className="px-2.5 py-1 rounded bg-[#0b0c14] border border-slate-800">API_spec.json</span>
                      <span className="px-2.5 py-1 rounded bg-[#0b0c14] border border-slate-800">Database_FAQ.md</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#090a0f] border border-slate-800/80 flex flex-col justify-between space-y-3 font-mono text-[10px] text-gray-400">
                    <div className="flex items-center justify-between text-yellow-500">
                      <span>DATABASES_INGEST:</span>
                      <span className="text-[9px] animate-pulse bg-yellow-500/10 px-2 py-0.5 rounded">CONNECTING</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between"><span>Loading SupportDocs.pdf...</span><span className="text-emerald-400">100%</span></div>
                      <div className="flex justify-between"><span>Scanning FAQ schema...</span><span className="text-emerald-400">100%</span></div>
                      <div className="flex justify-between"><span>Chunking vector database...</span><span className="text-blue-400">Syncing</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">Step 2: Training & Intent Graph Synthesis</h4>
                    <p className="text-xs leading-relaxed opacity-85">
                      Our models analyze content and build fine-tuning parameters aligned with your brand guidelines. Safeguards are verified, and compliance filters are hardcoded into the pipeline core.
                    </p>
                    <ul className="text-xs space-y-1.5 opacity-80">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Masking confidential personal credentials</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Mapping escalation protocols</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-[#090a0f] border border-slate-800/80 space-y-3 font-mono text-[10px] text-gray-400">
                    <div className="flex items-center justify-between text-indigo-400">
                      <span>SYNTHESIZING_AGENT:</span>
                      <span className="text-emerald-500">READY</span>
                    </div>
                    <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-[100%] transition-all duration-1000" />
                    </div>
                    <p className="text-[9px]">Training accuracy reached: <span className="text-emerald-400 font-bold">99.85%</span> in 4.2 epochs.</p>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold">Step 3: Instant Automaton Launch</h4>
                    <p className="text-xs leading-relaxed opacity-85">
                      Deploy embeddable support widgets directly on websites, configure Slack webhooks, or route messages securely via REST APIs. Your support queue starts resolving tickets.
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 active:scale-95 transition-all text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer">
                      <RefreshCcw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                      Deploy Live Widget
                    </button>
                  </div>
                  <div className="p-4 rounded-xl bg-[#090a0f] border border-slate-800/80 text-emerald-400 space-y-2 font-mono text-[10px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>ROUTING_PROFILES:</span>
                      <span className="text-emerald-400 font-bold">LIVE ONLINE</span>
                    </div>
                    <p>✓ widget_embed_key: verified [ID: x882h9]</p>
                    <p>✓ Slack webhook handler: connected [SLA: 5s]</p>
                    <p className="text-slate-400 animate-pulse">✓ Ready to intercept client requests...</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
