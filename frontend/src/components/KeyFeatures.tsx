import { useState } from 'react';
import { KEY_FEATURES } from '../data';
import { KeyFeature } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain, Ticket, TrendingUp, BarChart3, ShieldCheck,
  Settings, Play, Terminal, ArrowUpRight, Lock
} from 'lucide-react';

interface KeyFeaturesProps {
  darkMode: boolean;
}

export default function KeyFeatures({ darkMode }: KeyFeaturesProps) {
  const [clickedFeature, setClickedFeature] = useState<string>('nlp');

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5.5 h-5.5 text-purple-400" />;
      case 'Ticket': return <Ticket className="w-5.5 h-5.5 text-slate-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5.5 h-5.5 text-indigo-400" />;
      case 'BarChart3': return <BarChart3 className="w-5.5 h-5.5 text-blue-400" />;
      default: return <Brain className="w-5.5 h-5.5" />;
    }
  };

  return (
    <section className={`py-20 relative transition-all duration-500 overflow-hidden ${
      darkMode ? 'bg-[#090a10] text-[#f1f3f9]' : 'bg-[#f8fafc] text-slate-900 border-t border-slate-200/55'
    }`} id="features">

      <div className="absolute top-1/2 left-1/4 w-[450px] h-[450px] bg-purple-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            id="key-features-heading"
          >
            Key Features
          </motion.h2>
          <p className={`mt-4 text-sm leading-relaxed ${
            darkMode ? 'text-gray-400' : 'text-slate-500'
          }`}>
            A comprehensive network of powerful automated parameters to elevate resolution rates,
            enforce secure transactions, and unlock real-time insight logs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="features-grid">
          {KEY_FEATURES.map((feat) => {
            const isSelected = clickedFeature === feat.id;
            return (
              <motion.div
                key={feat.id}
                onClick={() => setClickedFeature(feat.id)}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl cursor-pointer text-left transition-all duration-300 relative flex flex-col justify-between h-56 border ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#161726] to-[#0f101d] border-indigo-500/60 shadow-xl shadow-indigo-600/10 text-white'
                    : darkMode
                      ? 'bg-[#12131f]/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950/80'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  isSelected
                    ? 'bg-indigo-500/10 border border-indigo-500/35'
                    : darkMode ? 'bg-[#0f111a] border border-slate-800' : 'bg-slate-100 border border-slate-200'
                }`}>
                  {renderIcon(feat.icon)}
                </div>

                <div className="mt-4">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-indigo-400 mb-1 block">Feature Accent</span>
                  <h3 className={`text-base font-bold tracking-tight mb-1.5 ${
                    isSelected ? 'text-white' : darkMode ? 'text-slate-200' : 'text-slate-900'
                  }`}>
                    {feat.name}
                  </h3>
                  <p className={`text-[11px] leading-relaxed line-clamp-3 opacity-80 ${
                    isSelected ? 'text-gray-300' : darkMode ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    {feat.description}
                  </p>
                </div>

                <div className="text-[9px] font-mono tracking-wider text-right uppercase text-slate-500 font-semibold group-hover:text-indigo-400 mt-2">
                  {isSelected ? '● ACTIVE LIVE DEMO' : '○ CLICK TO LAUNCH'}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12" id="feature-interactive-visualization">
          <AnimatePresence mode="wait">
            <motion.div
              key={clickedFeature}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className={`p-6 sm:p-8 rounded-3xl border ${
                darkMode ? 'bg-[#0d0e15] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800'
              } shadow-lg`}
            >
              {clickedFeature === 'nlp' && (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 space-y-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider font-semibold rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                      Module: Neural Parser
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">Semantic Translation and Context Buffer Matching</h3>
                    <p className="text-xs leading-relaxed opacity-80">
                      The core AI model parses nested customer tickets while dynamically extracting emotional nuances. Our context buffer stores previous turns securely, resolving ambiguities with 98.4% diagnostic accuracy.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-indigo-400 block">Sentiment Vector</span>
                        <span className="font-bold">Positive (Confidence 99.2%)</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-indigo-400 block">Named Entities Detected</span>
                        <span className="font-bold">Product #TRK-881, Billing ID</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-80 p-4 rounded-2xl bg-black border border-slate-800 font-mono text-[10px] text-gray-400">
                    <p className="text-purple-400 mb-2">// Semantic Tokenization Response Stream</p>
                    <p>query: "refund subscription fees on wrong plan"</p>
                    <p className="text-emerald-400">intent: BILLING_DISPUTE (priority: 95/100)</p>
                    <p>entities: {"{ product_tier: 'Enterprise', order: 91018 }"}</p>
                    <p className="text-indigo-400">trigger_flow: true (initiating secure auth pipeline)</p>
                  </div>
                </div>
              )}

              {clickedFeature === 'ticketing' && (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 space-y-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider font-semibold rounded bg-slate-500/10 text-slate-300 border border-slate-500/20">
                      Module: Router Core
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">Algorithmic Ticket Sorting & Meta-Enrichment</h3>
                    <p className="text-xs leading-relaxed opacity-80">
                      Tickets are analyzed upon ingestion, appended with metadata like account tier and geographic origin, then assigned a smart risk/priority score instantly before routing to specialized support layers.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-slate-400 block">Response SLA</span>
                        <span className="font-bold">Under 1 Minute Guaranteed</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-slate-400 block">Routing Protocol</span>
                        <span className="font-bold">Direct Webhook Integration</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-80 p-4 rounded-2xl bg-black border border-slate-800 font-mono text-[10px] text-gray-400">
                    <p className="text-slate-400 mb-2">// Webhook Payload Dispatch</p>
                    <p>POST /api/webhooks/ticket-dispatch HTTP/1.1</p>
                    <p>Content-Type: application/json</p>
                    <p className="text-yellow-400 text-xs">"status": "AUTO_ASSIGNED",</p>
                    <p className="text-yellow-400 text-xs">"priority": "Tier_1_Critical",</p>
                    <p className="text-yellow-400 text-xs">"queue_id": "99402_Sec_A"</p>
                  </div>
                </div>
              )}

              {clickedFeature === 'insights' && (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 space-y-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider font-semibold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      Module: Trend Diagnostic
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">Diagnostics Forecasting & Churn Vector Prevention</h3>
                    <p className="text-xs leading-relaxed opacity-80">
                      Tracks user interactions over preceding sessions to alert of repeat friction points. Identifies early indications of churn risk and auto-drafts compensatory offers to secure customers.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-indigo-400 block">Friction Hotspots Detected</span>
                        <span className="font-bold">API Token Setup (64% variance)</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-indigo-400 block">Preventative Retention</span>
                        <span className="font-bold">Active SLA Compensator</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-80 p-4 rounded-2xl bg-black border border-slate-800 flex flex-col justify-between h-40">
                    <span className="text-[10px] font-mono text-gray-500">// Trend Graph Forecast</span>
                    <div className="flex items-end gap-1.5 h-20 pt-2">
                      <div className="bg-indigo-500/30 w-full h-8 rounded-t" />
                      <div className="bg-indigo-500/40 w-full h-12 rounded-t" />
                      <div className="bg-indigo-500/60 w-full h-16 rounded-t animate-pulse" />
                      <div className="bg-emerald-500 w-full h-20 rounded-t" />
                    </div>
                    <div className="flex justify-between text-[8px] font-mono text-gray-600 mt-1">
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Forecast</span>
                    </div>
                  </div>
                </div>
              )}

              {clickedFeature === 'analytics' && (
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-1 space-y-4">
                    <span className="px-2.5 py-1 text-[10px] font-mono tracking-wider font-semibold rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      Module: Throughput Telemetry
                    </span>
                    <h3 className="text-xl font-bold tracking-tight">Throughput Velocity & Live Performance Monitors</h3>
                    <p className="text-xs leading-relaxed opacity-80">
                      Dynamic dashboards visualization displaying aggregate ticket resolutions rates, chat model processing lag, load balancing spikes, and concurrent live chats.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-blue-400 block">Average Model Latency</span>
                        <span className="font-bold">142ms Response Stream</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-500/5 border border-slate-500/10">
                        <span className="text-[10px] font-mono text-blue-400 block">Resolution Accuracy Goal</span>
                        <span className="font-bold">99.8% Perfect Sync</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-80 p-4 rounded-2xl bg-black border border-slate-800 space-y-3 font-mono text-[10px]">
                    <div className="flex justify-between text-gray-500">
                      <span>LOAD COUNTER:</span>
                      <span className="text-blue-400">OK [98%]</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[88%] rounded-full" />
                    </div>
                    <div className="text-gray-400">
                      <span className="text-emerald-500">● 14,921 concurrent loops active</span><br />
                      <span>↳ Error rate variance: 0.001%</span>
                    </div>
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
