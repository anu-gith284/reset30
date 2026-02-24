import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, X, Settings, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onReset: () => void;
  onQuit: () => void;
  hasChallenge: boolean;
  currentView: "home" | "dashboard" | "community" | "resources";
  onNavigate: (view: "home" | "dashboard" | "community" | "resources") => void;
  onOpenSettings: () => void;
  userName?: string;
}

export function Header({
  onReset,
  onQuit,
  hasChallenge,
  currentView,
  onNavigate,
  onOpenSettings,
  userName,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: {
    label: string;
    view: "home" | "dashboard" | "community" | "resources";
  }[] = [
    { label: "HOME", view: "home" },
    ...(hasChallenge ? [{ label: "PROTOCOL", view: "dashboard" as const }] : []),
    { label: "COMMUNITY", view: "community" },
    { label: "RESOURCES", view: "resources" },
  ];

  const handleNavigate = (view: "home" | "dashboard" | "community" | "resources") => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                handleNavigate("home");
              }}
              className="font-sans font-black text-2xl tracking-tighter text-brand-blue hover:opacity-80 transition-opacity"
            >
              thereset
            </button>
            
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavigate(item.view)}
                  className={`text-[10px] font-black tracking-[0.2em] transition-all flex items-center gap-1 ${
                    currentView === item.view ? "text-brand-blue" : "text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {item.label}
                  <ChevronRight size={10} className={currentView === item.view ? "opacity-100" : "opacity-0"} />
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {userName && (
              <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-500 text-[10px] font-black tracking-widest uppercase">
                <User size={12} />
                {userName}
              </div>
            )}

            <button
              onClick={onOpenSettings}
              className="p-2 rounded-full text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
              title="Settings"
            >
              <Settings size={20} />
            </button>

            <button
              onClick={() => handleNavigate("home")}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-black tracking-widest uppercase hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-200"
            >
              Experience Reset
            </button>
            
            {/* Stylish Black Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-zinc-900 rounded-full shadow-lg"
              aria-label="Toggle menu"
            >
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-white rounded-full"
              />
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-white rounded-full"
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-6"
          >
            <div className="flex flex-col gap-10 text-center">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => handleNavigate(item.view)}
                  className={`text-5xl font-black tracking-tighter transition-all ${currentView === item.view ? "text-zinc-900 scale-110" : "text-zinc-400 hover:text-zinc-900"}`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="h-px w-20 bg-zinc-200 mx-auto" />
              
              <button
                onClick={() => {
                  onOpenSettings();
                  setIsMenuOpen(false);
                }}
                className="text-2xl font-black text-zinc-900 flex items-center justify-center gap-2"
              >
                <Settings size={24} />
                SETTINGS
              </button>

              {hasChallenge && currentView === "home" && (
                <button
                  onClick={() => {
                    onReset();
                    setIsMenuOpen(false);
                  }}
                  className="px-10 py-5 rounded-full bg-zinc-900 text-white font-black text-xl shadow-2xl"
                >
                  RESET CHALLENGE
                </button>
              )}
              
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to quit the current session? All progress will be lost.")) {
                    onQuit();
                    handleNavigate("home");
                  }
                }}
                className="text-zinc-400 text-sm font-black tracking-[0.3em] hover:text-red-500 transition-colors uppercase"
              >
                Quit Session
              </button>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute bottom-12 w-16 h-16 flex items-center justify-center bg-zinc-900 text-white rounded-full shadow-2xl"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
