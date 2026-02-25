import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo, ReactNode } from "react";
import {
  CheckCircle2,
  Trophy,
  Zap,
  Star,
  Award,
  ArrowLeft,
  Target,
  Shield,
  ListChecks,
  Activity,
  Flame,
} from "lucide-react";
import { ChallengeState, UserTask } from "../hooks/useChallenge";
import { motivationalQuotes } from "../data/challenges";
import confetti from "canvas-confetti";

interface DashboardProps {
  state: ChallengeState;
  onCompleteTask: (day: number, optionId: string, notes?: string) => void;
  userName?: string;
}

const BADGE_ICONS: Record<string, ReactNode> = {
  "First Step": <Star size={18} className="text-brand-blue" />,
  "3-Day Streak": <Zap size={18} className="text-brand-orange" />,
  "7-Day Streak": <Zap size={18} className="text-brand-orange" />,
  "Double Digits": <Award size={18} className="text-brand-blue" />,
  "15-Day Streak": <Star size={18} className="text-brand-orange" />,
  "Almost There": <Award size={18} className="text-brand-blue" />,
  "21-Day Streak": <Zap size={18} className="text-brand-orange" />,
  "30-Day Finisher": <Trophy size={18} className="text-brand-orange" />,
};

export function Dashboard({ state, onCompleteTask, userName }: DashboardProps) {
  const [selectedTask, setSelectedTask] = useState<UserTask | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const completedCount = state.tasks.filter((t) => t.completed).length;
  const progressPercentage = Math.round((completedCount / 30) * 100);

  const currentDay = Math.min(completedCount + 1, 30);
  const quote = useMemo(
    () => motivationalQuotes[currentDay % motivationalQuotes.length],
    [currentDay],
  );

  const handleComplete = (day: number) => {
    if (!selectedOptionId) return;
    onCompleteTask(day, selectedOptionId);
    setSelectedTask(null);
    setSelectedOptionId(null);
    
    // Party-style celebration
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="min-h-screen pt-40 pb-24 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-zinc-900 text-white text-[11px] font-black tracking-[0.3em] mb-10 uppercase shadow-xl shadow-zinc-900/20">
            <Activity size={14} className="text-brand-orange" />
            <span>Operational Status: Active</span>
          </div>
          <h1 className="text-7xl md:text-[140px] font-serif font-black text-zinc-900 mb-10 tracking-tighter uppercase leading-none">
            Day {currentDay} <span className="text-zinc-200">/ 30</span>
          </h1>
          <div className="max-w-4xl mx-auto p-12 glass-card rounded-[48px] relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-6 py-1.5 border border-zinc-100 rounded-full text-[11px] font-black text-zinc-400 uppercase tracking-widest shadow-sm">
              Daily Directive
            </div>
            <p className="text-3xl md:text-4xl text-zinc-800 font-serif italic leading-tight">
              "{quote}"
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-[48px] p-12 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="w-16 h-16 bg-brand-blue/5 text-brand-blue rounded-3xl flex items-center justify-center">
                <Target size={32} />
              </div>
              <span className="text-5xl font-black text-brand-blue">{progressPercentage}%</span>
            </div>
            <div>
              <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-3">Protocol Completion</p>
              <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  className="h-full bg-brand-blue"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-[48px] p-12 relative overflow-hidden group"
          >
            {/* Animated background glow for streak */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-brand-orange rounded-full blur-[80px] pointer-events-none"
            />
            
            <div className="flex items-center gap-5 mb-10 relative z-10">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-3xl flex items-center justify-center shadow-lg shadow-brand-orange/20"
              >
                <Flame size={32} />
              </motion.div>
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">Active Streak</h3>
            </div>
            <div className="flex items-baseline gap-3 relative z-10">
              <motion.span 
                key={state.streak}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl font-black text-zinc-900 tracking-tighter"
              >
                {state.streak}
              </motion.span>
              <span className="text-2xl font-black text-zinc-400 uppercase tracking-widest">Days</span>
            </div>
            <p className="text-[11px] font-bold text-zinc-400 mt-6 uppercase tracking-widest relative z-10">Longest: {state.longestStreak} Days</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-[48px] p-12"
          >
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 bg-zinc-900/5 text-zinc-900 rounded-3xl flex items-center justify-center">
                <Shield size={32} />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">Commendations</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {state.badges.length > 0 ? (
                state.badges.map((badge) => (
                  <div key={badge} className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center border border-zinc-100 shadow-sm" title={badge}>
                    {BADGE_ICONS[badge] || <Star size={20} className="text-zinc-400" />}
                  </div>
                ))
              ) : (
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest py-6">No Merits Earned</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-6">
          {state.tasks.map((task) => (
            <motion.button
              key={task.day}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedTask(task);
                setSelectedOptionId(task.selectedOptionId || null);
              }}
              className={`relative aspect-square rounded-[32px] flex flex-col items-center justify-center transition-all border-2 ${
                task.completed
                  ? "bg-brand-blue text-white border-brand-blue shadow-xl shadow-brand-blue/20"
                  : task.day === currentDay
                    ? "bg-white border-brand-orange text-zinc-900 shadow-2xl shadow-brand-orange/10"
                    : "bg-white/40 backdrop-blur-xl border-white/60 text-zinc-400 hover:border-zinc-300"
              }`}
            >
              <span className="text-3xl font-black">{task.day}</span>
              {task.completed && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 size={18} />
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTask(null)}
              className="absolute inset-0 bg-zinc-900/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[48px] p-10 md:p-16 max-w-3xl w-full shadow-2xl border border-white/20 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-3 bg-brand-orange" />
              
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-zinc-900 text-white rounded-3xl flex items-center justify-center font-black text-3xl">
                    {selectedTask.day}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] mb-1">Objective Identified</p>
                    <h2 className="text-4xl font-serif font-black text-zinc-900 uppercase tracking-tight">
                      Day {selectedTask.day} Protocol
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-3 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400"
                >
                  <ArrowLeft size={32} />
                </button>
              </div>

              <div className="space-y-10 mb-16">
                <div>
                  <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Shield size={16} className="text-brand-orange" />
                    Mission Briefing: Choose your path
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTask.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => !selectedTask.completed && setSelectedOptionId(option.id)}
                        className={`p-8 rounded-[32px] border-2 text-left transition-all ${
                          selectedTask.completed 
                            ? (selectedTask.selectedOptionId === option.id ? "border-brand-blue bg-brand-blue/5" : "border-zinc-100 opacity-50")
                            : (selectedOptionId === option.id ? "border-brand-blue bg-brand-blue/5 shadow-lg" : "border-zinc-100 hover:border-zinc-200 bg-zinc-50")
                        }`}
                      >
                        <h5 className="text-xl font-black text-zinc-900 mb-3 uppercase tracking-tight">{option.title}</h5>
                        <p className="text-sm text-zinc-500 font-medium leading-relaxed">{option.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Show steps for selected option */}
                {(selectedOptionId || selectedTask.completed) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h4 className="text-xs font-black text-zinc-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                      <ListChecks size={16} className="text-brand-blue" />
                      Execution Protocol
                    </h4>
                    <div className="grid gap-4">
                      {(selectedTask.completed 
                        ? selectedTask.options.find(o => o.id === selectedTask.selectedOptionId)
                        : selectedTask.options.find(o => o.id === selectedOptionId)
                      )?.steps.map((step, i) => (
                        <div key={i} className="flex gap-6 items-start p-6 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:bg-white hover:border-brand-blue/20 transition-all">
                          <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-zinc-900 text-white text-xs font-black flex items-center justify-center">
                            {i + 1}
                          </span>
                          <span className="text-zinc-700 text-lg font-medium leading-snug">{step}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {!selectedTask.completed ? (
                  <motion.button
                    key="complete-btn"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => handleComplete(selectedTask.day)}
                    disabled={!selectedOptionId}
                    className={`w-full py-8 rounded-full font-black text-2xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 group ${
                      selectedOptionId 
                        ? "bg-zinc-900 text-white hover:bg-zinc-800" 
                        : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    CONFIRM COMPLETION
                  </motion.button>
                ) : (
                  <motion.div
                    key="completed-status"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full py-8 rounded-full bg-brand-blue/10 text-brand-blue font-black text-2xl flex items-center justify-center gap-4 border border-brand-blue/20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    OBJECTIVE SECURED
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
