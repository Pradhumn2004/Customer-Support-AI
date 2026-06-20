import { INDUSTRIES } from '../data';
import { Industry } from '../types';
import { motion } from 'motion/react';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface IndustrySelectorProps {
  darkMode: boolean;
  onStartChat: (industryId: string) => void;
}

export default function IndustrySelector({ darkMode, onStartChat }: IndustrySelectorProps) {

  return (
    <section className={`py-20 transition-all duration-500 rounded-t-[40px] -mt-8 relative z-20 ${
      darkMode ? 'bg-[#0f111a] text-slate-100' : 'bg-white text-slate-900 border-t border-slate-100'
    }`} id="solutions">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}
            id="choose-industry-heading"
          >
            Choose Your Industry
          </motion.h2>
          <p className={`mt-4 text-sm sm:text-base leading-relaxed ${
            darkMode ? 'text-gray-400' : 'text-slate-500'
          }`}>
            We deliver specialized custom training LLM arrays pre-configured with strict parameters, compliance rules,
            and localized integrations matching your target sector.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="industries-grid">
          {INDUSTRIES.map((ind) => (
            <motion.div
              key={ind.id}
              onClick={() => onStartChat(ind.id)}
              whileHover={{ y: -4, scale: 1.01 }}
              className={`p-6 sm:p-8 rounded-2xl border text-left cursor-pointer transition-all duration-300 relative group flex flex-col justify-between h-56 ${
                darkMode
                  ? 'bg-[#151724]/60 border-slate-800 hover:border-violet-500/60 hover:bg-slate-900/80'
                  : 'bg-slate-50/80 border-slate-200/80 hover:border-violet-300 hover:bg-white hover:shadow-md'
              }`}
            >
              <div>
                <h3 className={`text-xl font-bold tracking-tight mb-2.5 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {ind.name}
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed font-normal opacity-85 line-clamp-3 ${
                  darkMode ? 'text-gray-400' : 'text-slate-600'
                }`}>
                  {ind.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-violet-500 group-hover:text-violet-600 mt-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Start Chat</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
