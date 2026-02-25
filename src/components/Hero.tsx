import { motion } from "motion/react";
import { Category } from "../data/challenges";
import { ArrowRight, Zap, Brain, Dumbbell, Sparkles, Moon, DollarSign } from "lucide-react";

interface HeroProps {
  onSelect: (category: Category) => void;
  userName?: string;
  activeCategory?: Category | null;
}

const categories: {
  id: Category;
  title: string;
  description: string;
  icon: any;
  color: string;
  bg: string;
  accent: string;
}[] = [
  {
    id: "Mental Health",
    title: "Mental Clarity",
    description: "Reset your mind with mindfulness, focus, and cognitive exercises.",
    icon: Brain,
    color: "text-blue-600",
    bg: "bg-blue-50",
    accent: "group-hover:bg-blue-600",
  },
  {
    id: "Fitness",
    title: "Physical Power",
    description: "Transform your body with functional movement and strength habits.",
    icon: Dumbbell,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    accent: "group-hover:bg-emerald-600",
  },
  {
    id: "Productivity",
    title: "Deep Work",
    description: "Master your time and energy with high-performance productivity systems.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    accent: "group-hover:bg-amber-600",
  },
  {
    id: "Sleep Improvement",
    title: "Circadian Reset",
    description: "Optimize your sleep architecture for maximum recovery and vitality.",
    icon: Moon,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    accent: "group-hover:bg-indigo-600",
  },
  {
    id: "Money Saving",
    title: "Capital Guard",
    description: "Master financial discipline and strategic capital allocation.",
    icon: DollarSign,
    color: "text-rose-600",
    bg: "bg-rose-50",
    accent: "group-hover:bg-rose-600",
  },
];

export function Hero({ onSelect, userName, activeCategory }: HeroProps) {
  const handleSelect = (id: Category) => {
    if (activeCategory && activeCategory !== id) {
      if (confirm(`You are currently in the ${activeCategory} protocol. Starting the ${id} protocol will reset your current progress. Proceed?`)) {
        onSelect(id);
      }
    } else {
      onSelect(id);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-48 pb-20 md:pb-32 px-4 overflow-hidden bg-[#fdfdfd]">
      {/* Sarvam AI Hard Visible Top Gradient */}
      <div className="absolute top-0 left-0 w-full h-[400px] md:h-[600px] bg-[radial-gradient(ellipse_at_50%_-10%,#f08a4b_0%,transparent_80%)] opacity-60 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[400px] md:h-[600px] bg-[radial-gradient(ellipse_at_15%_-5%,#0047ab_0%,transparent_70%)] opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[400px] md:h-[600px] bg-[radial-gradient(ellipse_at_85%_-5%,#0047ab_0%,transparent_70%)] opacity-50 pointer-events-none" />

      {/* Sarvam AI Inspired Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/20 rounded-full blur-[150px] animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue/5 border border-brand-blue/10 text-brand-blue text-[11px] md:text-[13px] font-black tracking-widest mb-4 md:mb-8 uppercase"
        >
          <span>{userName ? `Hello, ${userName}` : "The Sovereign Transformation Protocol"}</span>
        </motion.div>

        {/* Decorative Flourish SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 md:mb-6 flex justify-center opacity-40"
        >
          <svg width="160" height="30" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20C80 20 70 5 50 5C30 5 20 20 0 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-zinc-400" />
            <path d="M100 20C120 20 130 5 150 5C170 5 180 20 200 20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-zinc-400" />
            <circle cx="100" cy="20" r="3" fill="currentColor" className="text-zinc-300" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-[100px] font-serif font-black text-zinc-900 mb-6 md:mb-8 tracking-[-0.04em] leading-[0.9]"
        >
          Reclaim your <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-zinc-900">
              focus from within.
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-zinc-500 max-w-3xl mx-auto mb-12 md:mb-16 font-medium leading-tight tracking-tight"
        >
          {activeCategory 
            ? `You are currently executing the ${activeCategory} protocol. Continue your transformation below.`
            : "Built on discipline. Powered by focus. Delivering population-scale impact."}
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleSelect(cat.id)}
                className={`group relative border p-8 md:p-12 rounded-[48px] md:rounded-[64px] shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.1)] hover:-translate-y-4 transition-all duration-700 overflow-hidden ${
                  isActive ? "bg-zinc-900 border-zinc-900" : "bg-white/40 backdrop-blur-2xl border-white/60"
                }`}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 ${isActive ? "bg-white/10 text-white" : `${cat.bg} ${cat.color}`} rounded-[24px] md:rounded-[32px] flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                  <cat.icon size={32} className="md:w-10 md:h-10" />
                </div>
                
                <h3 className={`text-2xl md:text-4xl font-black mb-4 md:mb-6 tracking-tight transition-colors ${isActive ? "text-white" : "text-zinc-900 group-hover:text-zinc-800"}`}>
                  {cat.title}
                </h3>
                
                <p className={`text-base md:text-xl mb-8 md:mb-12 leading-snug font-medium transition-colors ${isActive ? "text-zinc-400" : "text-zinc-500 group-hover:text-zinc-600"}`}>
                  {cat.description}
                </p>
                
                <div className={`flex items-center gap-3 text-base font-black tracking-wider ${isActive ? "text-brand-orange" : "text-zinc-900"}`}>
                  <span className="relative overflow-hidden">
                    <span className="inline-block group-hover:-translate-y-full transition-transform duration-300">
                      {isActive ? "RESUME PROTOCOL" : "START RESET"}
                    </span>
                    <span className="absolute top-full left-0 inline-block group-hover:-translate-y-full transition-transform duration-300">
                      {isActive ? "RESUME PROTOCOL" : "START RESET"}
                    </span>
                  </span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>

                {isActive && (
                  <div className="absolute top-8 right-8">
                    <div className="px-4 py-1.5 bg-brand-orange text-white text-[11px] font-black rounded-full uppercase tracking-widest animate-pulse">
                      Active
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-300 to-transparent" />
      </motion.div>
    </div>
  );
}
