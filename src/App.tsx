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

const INITIAL_POSTS: Post[] = [];

export default function App() {
  const { state, startChallenge, completeTask, resetChallenge, quitChallenge } =
    useChallenge();
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [communityPosts, setCommunityPosts] = useState<Post[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("thereset_profile");
    return saved ? JSON.parse(saved) : null;
  });
  const [showSettings, setShowSettings] = useState(false);

  // Fetch initial posts and setup WebSocket
  useEffect(() => {
    // Initial fetch
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setCommunityPosts(data))
      .catch(err => console.error("Failed to fetch posts:", err));

    // WebSocket connection
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}`;
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "POST_ADDED") {
        setCommunityPosts(prev => [message.payload, ...prev]);
      }
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("thereset_profile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  // Add a community post when a task is completed
  const handleCompleteTask = (day: number, optionId: string, notes?: string) => {
    completeTask(day, optionId, notes);
    
    const newPost = {
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
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({
        type: "NEW_POST",
        payload: newPost
      }));
    }
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
      {/* Sarvam AI Inspired Background */}
      <div className="fixed inset-0 sarvam-bg-glow pointer-events-none z-[-1]" />

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
