import { useState, useEffect } from "react";
import { Category, challengesData, TaskData } from "../data/challenges";

export interface UserTask extends TaskData {
  completed: boolean;
  selectedOptionId?: string;
  notes?: string;
  completedAt?: string;
}

export interface ChallengeState {
  category: Category | null;
  startDate: string | null;
  tasks: UserTask[];
  streak: number;
  longestStreak: number;
  badges: string[];
}

const STORAGE_KEY = "thereset_protocol_v2";

const initialState: ChallengeState = {
  category: null,
  startDate: null,
  tasks: [],
  streak: 0,
  longestStreak: 0,
  badges: [],
};

export function useChallenge() {
  const [state, setState] = useState<ChallengeState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure tasks have options (migration for old data)
        if (parsed.category && parsed.tasks.length > 0 && !parsed.tasks[0].options) {
          const freshTasks = challengesData[parsed.category as Category];
          parsed.tasks = parsed.tasks.map((t: any, i: number) => ({
            ...t,
            options: freshTasks[i]?.options || []
          }));
        }
        return parsed;
      } catch (e) {
        console.error("Protocol Data Corruption Detected", e);
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const startChallenge = (category: Category) => {
    const tasks: UserTask[] = challengesData[category].map((t) => ({
      ...t,
      completed: false,
    }));
    setState({
      category,
      startDate: new Date().toISOString(),
      tasks,
      streak: 0,
      longestStreak: 0,
      badges: [],
    });
  };

  const completeTask = (day: number, optionId: string, notes?: string) => {
    setState((prev) => {
      const newTasks = prev.tasks.map((t) =>
        t.day === day
          ? {
              ...t,
              completed: true,
              selectedOptionId: optionId,
              notes,
              completedAt: new Date().toISOString(),
            }
          : t,
      );

      // Calculate streak
      let currentStreak = 0;
      let maxStreak = prev.longestStreak;

      // Simple streak calculation: count consecutive completed tasks from day 1
      // For a real app, this might depend on actual dates, but for a 30-day challenge,
      // consecutive days completed works.
      for (let i = 0; i < newTasks.length; i++) {
        if (newTasks[i].completed) {
          currentStreak++;
          if (currentStreak > maxStreak) maxStreak = currentStreak;
        } else {
          break; // Streak broken if we find an uncompleted task in sequence
        }
      }

      // Check badges
      const newBadges = [...prev.badges];

      // Streak badges
      if (currentStreak >= 3 && !newBadges.includes("3-Day Streak"))
        newBadges.push("3-Day Streak");
      if (currentStreak >= 7 && !newBadges.includes("7-Day Streak"))
        newBadges.push("7-Day Streak");
      if (currentStreak >= 15 && !newBadges.includes("15-Day Streak"))
        newBadges.push("15-Day Streak");
      if (currentStreak >= 21 && !newBadges.includes("21-Day Streak"))
        newBadges.push("21-Day Streak");
      if (currentStreak >= 30 && !newBadges.includes("30-Day Finisher"))
        newBadges.push("30-Day Finisher");

      // Milestone badges based on total completed
      const totalCompleted = newTasks.filter((t) => t.completed).length;
      if (totalCompleted >= 1 && !newBadges.includes("First Step"))
        newBadges.push("First Step");
      if (totalCompleted >= 10 && !newBadges.includes("Double Digits"))
        newBadges.push("Double Digits");
      if (totalCompleted >= 20 && !newBadges.includes("Almost There"))
        newBadges.push("Almost There");

      return {
        ...prev,
        tasks: newTasks,
        streak: currentStreak,
        longestStreak: maxStreak,
        badges: newBadges,
      };
    });
  };

  const resetChallenge = () => {
    setState((prev) => {
      if (!prev.category) return initialState;
      const tasks: UserTask[] = challengesData[prev.category].map((t) => ({
        ...t,
        completed: false,
      }));
      return {
        category: prev.category,
        startDate: new Date().toISOString(),
        tasks,
        streak: 0,
        longestStreak: 0,
        badges: [],
      };
    });
  };

  const quitChallenge = () => {
    setState(initialState);
  };

  return {
    state,
    startChallenge,
    completeTask,
    resetChallenge,
    quitChallenge,
  };
}
