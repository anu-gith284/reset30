import { motion } from "motion/react";
import { X, User, Calendar, Save } from "lucide-react";
import { useState, FormEvent } from "react";

interface SettingsModalProps {
  profile: { name: string; age: string; gender: string };
  onClose: () => void;
  onSave: (profile: { name: string; age: string; gender: string }) => void;
}

export function SettingsModal({ profile, onClose, onSave }: SettingsModalProps) {
  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [gender, setGender] = useState(profile.gender);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave({ name, age, gender });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[48px] p-10 md:p-16 max-w-lg w-full shadow-2xl border border-white/20 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-10 right-10 p-3 rounded-full hover:bg-zinc-100 transition-colors text-zinc-400 hover:text-zinc-900"
        >
          <X size={28} />
        </button>

        <div className="mb-12">
          <h2 className="text-5xl font-serif font-black text-zinc-900 mb-4 tracking-tight uppercase">
            System Config
          </h2>
          <p className="text-zinc-500 font-medium text-lg">
            Update your operational parameters.
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-6 rounded-full bg-zinc-900 text-white font-black text-xl shadow-2xl hover:bg-zinc-800 transition-all active:scale-95 mt-6 flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            <Save size={24} />
            Commit Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
}
