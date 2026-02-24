import { motion } from "motion/react";
import { Category } from "../data/challenges";
import { ArrowRight, Zap, Brain, Dumbbell, Sparkles } from "lucide-react";

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
];

export function Hero({ onSelect, userName, activeCategory }: HeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-[#fdfdfd]">
      {/* Sarvam AI Inspired Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-orange/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-blue/10 rounded-full blur-[150px] animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-500 text-xs font-black tracking-[0.2em] mb-12 uppercase"
        >
          <Sparkles size={14} className="text-brand-orange" />
          <span>{userName ? `Hello, ${userName}` : "Sovereign Transformation Platform"}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-[100px] font-serif font-black text-zinc-900 mb-8 tracking-[-0.04em] leading-[0.8] uppercase"
        >
          Reclaim <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-600">
              Your Focus.
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-4 left-0 h-4 bg-brand-orange/20 -z-10 rounded-full"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-3xl text-zinc-500 max-w-3xl mx-auto mb-20 font-medium leading-tight tracking-tight"
        >
          {activeCategory 
            ? `You are currently executing the ${activeCategory} protocol. Continue your transformation below.`
            : "A curated 30-day journey designed to strip away the noise and rebuild your most essential habits."}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onSelect(cat.id)}
                className={`group relative border p-10 rounded-[48px] shadow-[0_8px_32px_rgba(0,0,0,0.02)] hover:shadow-[0_32px_80px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-700 overflow-hidden ${
                  isActive ? "bg-zinc-900 border-zinc-900" : "bg-white/30 backdrop-blur-2xl border-white/40"
                }`}
              >
                <div className={`w-16 h-16 ${isActive ? "bg-white/10 text-white" : `${cat.bg} ${cat.color}`} rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm`}>
                  <cat.icon size={32} />
                </div>
                
                <h3 className={`text-3xl font-black mb-4 tracking-tight transition-colors ${isActive ? "text-white" : "text-zinc-900 group-hover:text-zinc-800"}`}>
                  {cat.title}
                </h3>
                
                <p className={`text-lg mb-10 leading-snug font-medium transition-colors ${isActive ? "text-zinc-400" : "text-zinc-500 group-hover:text-zinc-600"}`}>
                  {cat.description}
                </p>
                
                <div className={`flex items-center gap-3 text-sm font-black tracking-wider ${isActive ? "text-brand-orange" : "text-zinc-900"}`}>
                  <span className="relative overflow-hidden">
                    <span className="inline-block group-hover:-translate-y-full transition-transform duration-300">
                      {isActive ? "RESUME PROTOCOL" : "START RESET"}
                    </span>
                    <span className="absolute top-full left-0 inline-block group-hover:-translate-y-full transition-transform duration-300">
                      {isActive ? "RESUME PROTOCOL" : "START RESET"}
                    </span>
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>

                {isActive && (
                  <div className="absolute top-6 right-6">
                    <div className="px-3 py-1 bg-brand-orange text-white text-[10px] font-black rounded-full uppercase tracking-widest animate-pulse">
                      Active
                    </div>
                  </div>
                )}

                {/* Decorative corner element */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-zinc-900/[0.02] rounded-bl-full transition-opacity opacity-0 group-hover:opacity-100`} />
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
