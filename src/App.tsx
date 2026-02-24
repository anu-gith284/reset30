/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useChallenge } from "./hooks/useChallenge";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Dashboard } from "./components/Dashboard";
import { Footer } from "./components/Footer";
import { Community } from "./components/Community";
import { Resources } from "./components/Resources";
import { OnboardingModal } from "./components/OnboardingModal";
import { SettingsModal } from "./components/SettingsModal";

export type ViewState = "home" | "dashboard" | "community" | "resources";

export interface UserProfile {
  name: string;
  age: string;
  gender: string;
}

export interface Post {
  id: string | number;
  user: string;
  avatar: string;
  category: string;
  day: number;
  content: string;
  likes: number;
  comments: number;
  time: string;
  timestamp: number;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    user: "Vikram Malhotra",
    avatar: "https://picsum.photos/seed/vikram/100/100",
    category: "Mental Health",
    day: 12,
    content: "Vipassana session complete. Cognitive clarity is reaching peak levels. The noise of the external world is diminishing. Stay disciplined.",
    likes: 124,
    comments: 12,
    time: "2h ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 2
  },
  {
    id: 2,
    user: "Ananya Sharma",
    avatar: "https://picsum.photos/seed/ananya/100/100",
    category: "Fitness",
    day: 7,
    content: "Day 7: Cold exposure protocol executed. Physiological adaptation is evident. The initial resistance has been neutralized. Proceeding to next phase.",
    likes: 89,
    comments: 24,
    time: "4h ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 4
  },
  {
    id: 3,
    user: "Rohan Gupta",
    avatar: "https://picsum.photos/seed/rohan/100/100",
    category: "Productivity",
    day: 21,
    content: "Deep work block: 4 hours of uninterrupted output achieved. The 'No Phone' directive is non-negotiable. Efficiency has increased by 40%.",
    likes: 215,
    comments: 45,
    time: "6h ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 6
  },
  {
    id: 4,
    user: "Priya Iyer",
    avatar: "https://picsum.photos/seed/priya/100/100",
    category: "Sleep Improvement",
    day: 15,
    content: "Circadian rhythm calibrated. 18°C environment maintained. Sleep architecture is stabilizing. Recovery is the foundation of performance.",
    likes: 156,
    comments: 18,
    time: "8h ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 8
  },
  {
    id: 5,
    user: "Arjun Das",
    avatar: "https://picsum.photos/seed/arjun/100/100",
    category: "Money Saving",
    day: 30,
    content: "Protocol Day 30: Capital preservation targets exceeded. Financial discipline is now an automated system. The transformation is complete.",
    likes: 542,
    comments: 89,
    time: "12h ago",
    timestamp: Date.now() - 1000 * 60 * 60 * 12
  }
];

export default function App() {
  const { state, startChallenge, completeTask, resetChallenge, quitChallenge } =
    useChallenge();
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [communityPosts, setCommunityPosts] = useState<Post[]>(INITIAL_POSTS);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("thereset_profile");
    return saved ? JSON.parse(saved) : null;
  });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("thereset_profile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  // Add a community post when a task is completed
  const handleCompleteTask = (day: number, notes?: string) => {
    completeTask(day, notes);
    
    const newPost: Post = {
      id: Date.now(),
      user: userProfile?.name || "Operative",
      avatar: `https://picsum.photos/seed/${userProfile?.name || 'operative'}/100/100`,
      category: state.category || "General",
      day: day,
      content: notes || `Objective Secured: Day ${day} of ${state.category} protocol complete. System integrity maintained.`,
      likes: 0,
      comments: 0,
      time: "Just now",
      timestamp: Date.now()
    };
    
    setCommunityPosts(prev => [newPost, ...prev]);
  };

  const handleStartChallenge = (category: any) => {
    startChallenge(category);
    setCurrentView("dashboard");
  };

  const handleQuit = () => {
    quitChallenge();
    setCurrentView("home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfdfd] text-zinc-900 font-sans selection:bg-brand-blue/10 selection:text-brand-blue relative z-0">
      {/* Subtle Sarvam AI Inspired Background */}
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(240,138,75,0.03)_0%,transparent_50%)] pointer-events-none z-[-1]" />
      <div className="fixed bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(0,71,171,0.03)_0%,transparent_50%)] pointer-events-none z-[-1]" />

      {!userProfile && (
        <OnboardingModal onComplete={setUserProfile} />
      )}

      {showSettings && userProfile && (
        <SettingsModal 
          profile={userProfile} 
          onClose={() => setShowSettings(false)} 
          onSave={setUserProfile} 
        />
      )}

      <Header
        onReset={resetChallenge}
        onQuit={handleQuit}
        hasChallenge={!!state.category}
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenSettings={() => setShowSettings(true)}
        userName={userProfile?.name}
      />

      <main className="flex-grow">
        {currentView === "community" && <Community posts={communityPosts} />}
        {currentView === "resources" && <Resources />}
        {currentView === "home" && (
          <Hero 
            onSelect={handleStartChallenge} 
            userName={userProfile?.name} 
            activeCategory={state.category} 
          />
        )}
        {currentView === "dashboard" && (
          state.category ? (
            <Dashboard state={state} onCompleteTask={handleCompleteTask} userName={userProfile?.name} />
          ) : (
            <Hero onSelect={handleStartChallenge} userName={userProfile?.name} />
          )
        )}
      </main>

      <Footer onNavigate={setCurrentView} />
    </div>
  );
}
