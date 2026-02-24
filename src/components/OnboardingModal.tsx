import { motion, AnimatePresence } from "motion/react";
import { useState, FormEvent } from "react";
import { User, Calendar, UserCircle } from "lucide-react";

interface OnboardingModalProps {
  onComplete: (profile: { name: string; age: string; gender: string }) => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && age && gender) {
      onComplete({ name, age, gender });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[48px] p-10 md:p-16 max-w-lg w-full shadow-2xl border border-white/20"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
            <UserCircle size={40} className="text-white" />
          </div>
          <h2 className="text-5xl font-serif font-black text-zinc-900 mb-4 tracking-tight uppercase">
            Initiate Protocol
          </h2>
          <p className="text-zinc-500 font-medium text-lg">
            Establish your cognitive and physical baseline.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase ml-1">
              Full Name / Identifier
            </label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Name"
                className="w-full pl-14 pr-6 py-5 rounded-3xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none font-bold text-zinc-900 text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase ml-1">
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                <input
                  required
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  className="w-full pl-14 pr-6 py-5 rounded-3xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none font-bold text-zinc-900 text-lg"
                />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase ml-1">
                Gender
              </label>
              <select
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-6 py-5 rounded-3xl bg-zinc-50 border border-zinc-100 focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none font-bold text-zinc-900 text-lg appearance-none"
              >
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 rounded-full bg-zinc-900 text-white font-black text-xl shadow-2xl hover:bg-zinc-800 transition-all active:scale-95 mt-6 uppercase tracking-widest"
          >
            Commence Reset
          </button>
        </form>
      </motion.div>
    </div>
  );
}
