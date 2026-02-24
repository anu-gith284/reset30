import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Heart, Share2, MoreHorizontal, Filter, ArrowDownWideNarrow } from "lucide-react";
import { Post } from "../App";
import { useState, useMemo } from "react";

interface CommunityProps {
  posts: Post[];
}

type SortOption = "newest" | "likes" | "comments";
type CategoryFilter = "All" | "Fitness" | "Mental Health" | "Productivity" | "Money Saving" | "Sleep Improvement";

const POSTS_PER_PAGE = 3;

export function Community({ posts }: CommunityProps) {
  const [filter, setFilter] = useState<CategoryFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [likedPosts, setLikedPosts] = useState<Set<string | number>>(new Set());

  const categories: CategoryFilter[] = ["All", "Fitness", "Mental Health", "Productivity", "Money Saving", "Sleep Improvement"];

  const processedPosts = useMemo(() => {
    let result = [...posts];

    // Filter
    if (filter !== "All") {
      result = result.filter(post => post.category === filter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "comments") return b.comments - a.comments;
      return b.timestamp - a.timestamp;
    });

    return result;
  }, [posts, filter, sortBy]);

  const visiblePosts = processedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < processedPosts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE);
  };

  const toggleLike = (id: string | number) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 relative overflow-hidden bg-[#fdfdfd]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-black tracking-[0.3em] mb-8 uppercase">
            Operational Intelligence
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-zinc-900 mb-8 tracking-tighter uppercase leading-none">
            The Network
          </h1>
          <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 font-medium">
            Real-time synchronization of human potential. Monitor the progress of the collective.
          </p>

          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-zinc-100 p-6 rounded-[32px] shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
              <Filter size={14} className="text-zinc-400 shrink-0 ml-2" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setFilter(cat);
                    setVisibleCount(POSTS_PER_PAGE);
                  }}
                  className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest transition-all whitespace-nowrap uppercase ${
                    filter === cat 
                      ? "bg-zinc-900 text-white shadow-lg" 
                      : "bg-zinc-50 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
              <ArrowDownWideNarrow size={14} className="text-zinc-400 ml-2" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-[10px] font-black text-zinc-900 focus:outline-none cursor-pointer pr-4 uppercase tracking-widest"
              >
                <option value="newest">Newest First</option>
                <option value="likes">Most Impactful</option>
                <option value="comments">Most Discussed</option>
              </select>
            </div>
          </div>
        </motion.div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="bg-white border border-zinc-100 p-8 md:p-12 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="flex items-start justify-between mb-10">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img 
                          src={post.avatar} 
                          alt={post.user} 
                          className="w-16 h-16 rounded-3xl object-cover border-4 border-zinc-50 shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-brand-orange rounded-2xl flex items-center justify-center text-white font-black text-[10px] border-4 border-white">
                          {post.day}
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-zinc-900 text-2xl uppercase tracking-tight">{post.user}</div>
                        <div className="flex items-center gap-3 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                          <span className="text-brand-blue">{post.category}</span>
                          <span>•</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-3 rounded-2xl hover:bg-zinc-50 text-zinc-400 hover:text-zinc-900 transition-all">
                      <MoreHorizontal size={24} />
                    </button>
                  </div>
                  
                  <p className="text-zinc-700 text-xl leading-relaxed mb-10 font-medium">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-zinc-50">
                    <div className="flex items-center gap-8">
                      <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-3 transition-all group ${likedPosts.has(post.id) ? "text-brand-orange" : "text-zinc-400 hover:text-brand-orange"}`}
                      >
                        <motion.div 
                          animate={likedPosts.has(post.id) ? { scale: [1, 1.6, 1], rotate: [0, 15, -15, 0] } : {}}
                          className={`p-3 rounded-2xl transition-colors ${likedPosts.has(post.id) ? "bg-brand-orange/5" : "group-hover:bg-brand-orange/5"}`}
                        >
                          <Heart 
                            size={24} 
                            fill={likedPosts.has(post.id) ? "currentColor" : "none"} 
                            className="transition-transform" 
                          />
                        </motion.div>
                        <span className="font-black text-lg">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-3 text-zinc-400 hover:text-brand-blue transition-all group">
                        <div className="p-3 rounded-2xl group-hover:bg-brand-blue/5 transition-colors">
                          <MessageSquare size={24} />
                        </div>
                        <span className="font-black text-lg">{post.comments}</span>
                      </button>
                    </div>
                    <button className="p-3 rounded-2xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-50 transition-all">
                      <Share2 size={24} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 bg-zinc-50 rounded-[40px] border border-dashed border-zinc-200"
              >
                <p className="text-zinc-400 text-xl font-black uppercase tracking-widest">No Active Signals Detected</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {hasMore && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
          >
            <button 
              onClick={handleLoadMore}
              className="px-12 py-6 rounded-full bg-zinc-900 text-white font-black text-lg hover:bg-zinc-800 transition-all shadow-2xl hover:-translate-y-1 uppercase tracking-widest"
            >
              Expand Feed
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
