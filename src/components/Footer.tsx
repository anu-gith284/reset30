interface FooterProps {
  onNavigate: (view: "home" | "dashboard" | "community" | "resources") => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-full py-12 px-6 mt-auto border-t border-zinc-100 bg-white relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <button
            onClick={() => onNavigate("home")}
            className="font-sans font-black text-2xl tracking-tighter text-brand-blue hover:opacity-80 transition-opacity"
          >
            thereset
          </button>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black tracking-[0.2em] text-zinc-400">
            <button
              onClick={() => onNavigate("home")}
              className="hover:text-zinc-900 transition-colors uppercase"
            >
              Platform
            </button>
            <button
              onClick={() => onNavigate("community")}
              className="hover:text-zinc-900 transition-colors uppercase"
            >
              Community
            </button>
            <button
              onClick={() => onNavigate("resources")}
              className="hover:text-zinc-900 transition-colors uppercase"
            >
              Resources
            </button>
          </div>
        </div>
        <div className="text-[10px] font-black text-zinc-400 tracking-widest uppercase">
          © {new Date().getFullYear()} THERESET PROTOCOL. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
