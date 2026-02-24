import { motion } from "motion/react";
import { BookOpen, Video, Headphones, Play, ArrowUpRight, Search, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useMemo, MouseEvent } from "react";

const resourceList = [
  {
    id: "habit-science",
    title: "The Science of Habits",
    description: "Understand how habits are formed and how to break bad ones effectively based on neurological research.",
    icon: BookOpen,
    color: "bg-brand-blue/5 text-brand-blue",
    link: "https://jamesclear.com/habit-triggers",
    type: "Article",
    duration: "10 min read"
  },
  {
    id: "guided-meditation",
    title: "Guided Meditations",
    description: "A collection of audio guides for mindfulness and mental clarity to help you stay grounded during your reset.",
    icon: Headphones,
    color: "bg-brand-orange/5 text-brand-orange",
    link: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    type: "Video",
    duration: "15 min"
  },
  {
    id: "workout-routines",
    title: "Workout Routines",
    description: "Video tutorials for home workouts requiring no equipment. Perfect for building physical power anywhere.",
    icon: Video,
    color: "bg-brand-blue/5 text-brand-blue",
    link: "https://www.youtube.com/watch?v=ml6cT4AZdqI",
    type: "Video",
    duration: "20 min"
  },
  {
    id: "deep-work",
    title: "Deep Work Masterclass",
    description: "Learn the rules for focused success in a distracted world. A guide to high-performance productivity.",
    icon: Play,
    color: "bg-brand-orange/5 text-brand-orange",
    link: "https://www.youtube.com/watch?v=mS_V_X29GgI",
    type: "Video",
    duration: "12 min"
  },
  {
    id: "productivity-tutorials",
    title: "Productivity Video Tutorials",
    description: "Master your workflow with these expert-led video tutorials on time management and focus.",
    icon: Video,
    color: "bg-brand-blue/5 text-brand-blue",
    link: "https://www.youtube.com/watch?v=iONDebHX9qk",
    type: "Video",
    duration: "18 min"
  },
  {
    id: "productivity-shorts",
    title: "Productivity Shorts",
    description: "Quick, high-impact productivity hacks in under 60 seconds. Optimized for rapid consumption.",
    icon: Play,
    color: "bg-brand-orange/5 text-brand-orange",
    link: "https://www.youtube.com/shorts/productivity",
    type: "Shorts",
    duration: "1 min"
  }
];

export function Resources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  const filteredResources = useMemo(() => {
    return resourceList.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleBookmark = (id: string, e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 relative overflow-hidden bg-[#fdfdfd]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-black tracking-[0.3em] mb-8 uppercase">
            Knowledge Repository
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-zinc-900 mb-8 tracking-tighter uppercase leading-none">
            The Archives
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 font-medium">
            High-density information modules designed for rapid cognitive enhancement.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={24} />
            <input 
              type="text"
              placeholder="SEARCH ARCHIVES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-8 py-6 rounded-[32px] bg-white border border-zinc-100 shadow-sm focus:outline-none focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all text-zinc-900 font-bold text-lg placeholder:text-zinc-300"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredResources.map((resource, idx) => (
            <motion.a
              key={resource.id}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white border border-zinc-100 p-10 md:p-12 rounded-[48px] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-bl-[100px] -z-10 group-hover:bg-brand-blue/5 transition-colors" />
              
              <div>
                <div className="flex items-center justify-between mb-10">
                  <div className={`w-16 h-16 rounded-3xl ${resource.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-zinc-100`}>
                    <resource.icon size={32} />
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => toggleBookmark(resource.id, e)}
                      className={`p-3 rounded-2xl transition-all ${bookmarks.includes(resource.id) ? 'bg-brand-blue text-white shadow-lg' : 'bg-zinc-50 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'}`}
                      title={bookmarks.includes(resource.id) ? "Remove from bookmarks" : "Save for later"}
                    >
                      {bookmarks.includes(resource.id) ? <BookmarkCheck size={24} /> : <Bookmark size={24} />}
                    </button>
                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{resource.type}</span>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{resource.duration}</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-black text-zinc-900 mb-4 group-hover:text-brand-blue transition-colors uppercase tracking-tight">
                  {resource.title}
                </h3>
                <p className="text-zinc-500 text-lg leading-relaxed mb-10 font-medium">
                  {resource.description}
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-xs font-black text-zinc-900 uppercase tracking-[0.2em]">
                Access Module <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-32 bg-zinc-50 rounded-[48px] border border-dashed border-zinc-200">
            <p className="text-zinc-400 text-xl font-black uppercase tracking-widest">No Matching Modules Found</p>
          </div>
        )}
      </div>
    </div>
  );
}
