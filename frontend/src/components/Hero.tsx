import React, { useState } from 'react';
import { Search, Sparkles, MessageSquareCode, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  darkMode: boolean;
  onSelectIndustry: (id: string) => void;
}

export default function Hero({ darkMode, onSelectIndustry }: HeroProps) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<null | { title: string; text: string; keywords: string[] }>(null);

  const sampleQueries = [
    { text: "Retail billing disputes agent", target: "ecommerce" },
    { text: "HIPAA-compliant symptom checker", target: "telemedicine" },
    { text: "Dynamic portfolio risk analyzer", target: "fintech" },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResults(null);

    setTimeout(() => {
      setLoading(false);
      let guessedCategory = "SaaS Platform Agent";
      let keyWords = ["Integrations", "API", "Auth"];
      let dummyOutput = "A security-first AI pipeline designed to parse API request headers, manage token rotation logs, and safely dispatch webhooks directly into client dashboards.";

      const lowerQuery = query.toLowerCase();
      if (lowerQuery.includes('health') || lowerQuery.includes('medical') || lowerQuery.includes('patient') || lowerQuery.includes('hipaa') || lowerQuery.includes('triage') || lowerQuery.includes('symptom')) {
        guessedCategory = "Telemedicine Triage";
        keyWords = ["HIPAA", "PHD Encryption", "Doctor Queue"];
        dummyOutput = "Secure patient ticket routers with automated priority triage. Patients receive instant structured symptom logs matched with your practice providers, completely protected by HIPAA policies.";
      } else if (lowerQuery.includes('pay') || lowerQuery.includes('invoice') || lowerQuery.includes('fintech') || lowerQuery.includes('bank') || lowerQuery.includes('money') || lowerQuery.includes('card')) {
        guessedCategory = "Fintech Ledger Agent";
        keyWords = ["PCI-DSS", "Reconciliation", "Fraud Guard"];
        dummyOutput = "Automated reconciliation models checking payment deltas against multi-currency ledgers. Directly integrates with Stripe metadata arrays and marks pending wires.";
      } else if (lowerQuery.includes('shop') || lowerQuery.includes('store') || lowerQuery.includes('merchant') || lowerQuery.includes('product') || lowerQuery.includes('order')) {
        guessedCategory = "E-Commerce Assistant";
        keyWords = ["Logistic Sync", "Refund Protocol", "Cart Conversion"];
        dummyOutput = "Dynamically connects with Shopify and DHL endpoints to instantly answer tracking queries, draft personalized cargo waivers, and boost cart checkouts.";
      } else if (lowerQuery.includes('fashion') || lowerQuery.includes('style') || lowerQuery.includes('wear') || lowerQuery.includes('dress')) {
        guessedCategory = "Fashion Styling Copilot";
        keyWords = ["Visual Match", "Recommendation Engine", "Seasonal"];
        dummyOutput = "Style match matrix. Cross-references real-time aesthetic databases with your stock inventory parameters to propose fashion outfits directly in chat feeds.";
      } else if (lowerQuery.includes('learn') || lowerQuery.includes('course') || lowerQuery.includes('student') || lowerQuery.includes('syllabus')) {
        guessedCategory = "E-Learning Companion";
        keyWords = ["Course Mapping", "Grading Tips", "Prerequisite Check"];
        dummyOutput = "Automatically generates lesson syllabus parameters, recommends supplementary reading material paths, and assists teachers with grading analytics queues.";
      }

      setResults({
        title: guessedCategory,
        text: dummyOutput,
        keywords: keyWords
      });
    }, 1200);
  };

  return (
    <section className={`relative pt-16 pb-24 overflow-hidden transition-all duration-500 ${
      darkMode ? 'bg-[#0b0c14] text-white' : 'bg-slate-50 text-slate-900'
    }`} id="hero-section">

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-6 inline-flex items-center gap-2 px-3 py-1 text-xs tracking-wide rounded-full font-semibold border ${
            darkMode ? 'bg-slate-900/80 border-slate-700/60 text-indigo-400' : 'bg-white border-indigo-100 text-indigo-600 shadow-sm'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-500 animate-pulse" />
          <span>Next-Generation Multi-Model Support CRM</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight sm:leading-none"
        >
          AI Support for <br className="sm:hidden" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 animate-gradient-text">
            Every Industry
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mt-6 text-base sm:text-lg max-w-2xl opacity-80 leading-relaxed font-normal ${
            darkMode ? 'text-gray-300' : 'text-slate-600'
          }`}
        >
          Connect secure intelligence models. Automatically parse catalogs, files, API endpoints
          and patient files to deploy custom support agents with strict regulatory parameters.
        </motion.p>

        <div className="relative mt-12 w-full max-w-2xl px-2 sm:px-0">

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className={`hidden md:flex absolute -left-16 top-0 w-11 h-11 rounded-xl items-center justify-center border shadow-md ${
              darkMode ? 'bg-slate-900 border-slate-800 text-purple-400' : 'bg-white border-slate-200 text-purple-600'
            }`}
          >
            <MessageSquareCode className="w-5.5 h-5.5" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
            className={`hidden md:flex absolute -right-16 bottom-2 w-11 h-11 rounded-xl items-center justify-center border shadow-md ${
              darkMode ? 'bg-slate-900 border-slate-800 text-blue-400' : 'bg-white border-slate-200 text-blue-600'
            }`}
          >
            <Database className="w-5.5 h-5.5" />
          </motion.div>

          <motion.form
            onSubmit={handleGenerate}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`p-1.5 flex items-center rounded-2xl border transition-all shadow-xl ${
              darkMode
                ? 'bg-[#12131f]/90 border-slate-800 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20'
                : 'bg-white border-slate-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/10'
            }`}
          >
            <div className="pl-3.5 pr-2 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything about your industry needs..."
              className="flex-1 bg-transparent py-3 text-sm focus:outline-none tracking-wide text-inherit"
              id="hero-search-input"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 sm:py-3 text-xs font-semibold rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 hover:brightness-110 active:scale-95 transition-all text-white shadow-lg inline-flex items-center gap-1.5 cursor-pointer"
              id="hero-generate-btn"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Generate
                </>
              )}
            </button>
          </motion.form>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className={`text-xs ${darkMode ? 'text-gray-400 font-medium' : 'text-slate-500'}`}>Quick templates:</span>
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setQuery(q.text);
                  onSelectIndustry(q.target);
                }}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all hover:scale-102 ${
                  darkMode
                    ? 'bg-slate-900/50 border-slate-800 text-gray-300 hover:text-white hover:bg-slate-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {q.text}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {(results || loading) && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className={`mt-8 text-left w-full max-w-2xl p-5 sm:p-6 rounded-2xl border ${
                darkMode
                  ? 'bg-slate-950/80 border-indigo-500/30 shadow-indigo-505/10 shadow-xl'
                  : 'bg-white border-indigo-100 shadow-xl shadow-indigo-100/10'
              }`}
              id="dynamic-response-card"
            >
              {loading ? (
                <div className="flex flex-col items-center py-6 text-center text-sm text-gray-400 gap-3">
                  <div className="w-8 h-8 rounded-full border-3 border-indigo-500/30 border-t-indigo-500 animate-spin" />
                  <p className="font-mono tracking-wide">Assembling deep neural intent graph structures...</p>
                </div>
              ) : (
                results && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-500/15 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <h4 className="font-bold text-sm tracking-tight">{results.title} Instantiated</h4>
                      </div>
                      <span className="text-[10px] font-mono tracking-wider opacity-60 bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md">
                        256-bit AES
                      </span>
                    </div>

                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                      {results.text}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <span className="text-[10px] font-mono text-gray-400 mr-1.5">Secure tags:</span>
                      {results.keywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono tracking-wide px-2 py-0.5 rounded bg-slate-500/10 text-violet-400 border border-violet-500/10"
                        >
                          #{kw.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
