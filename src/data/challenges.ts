export type Category =
  | "Fitness"
  | "Mental Health"
  | "Money Saving"
  | "Productivity"
  | "Sleep Improvement";

export interface TaskData {
  day: number;
  title: string;
  description: string;
  steps: string[];
}

export const challengesData: Record<Category, TaskData[]> = {
  Fitness: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Intense Protocol: Day ${i + 1}`,
    description: "A disciplined approach to physical dominance and functional strength.",
    steps: [
      "05:00 AM: Immediate hydration (500ml water with sea salt).",
      "05:15 AM: 20-minute high-intensity interval training (HIIT).",
      "06:00 AM: Cold exposure (3-minute cold shower).",
      "Throughout day: Maintain strict posture and nasal breathing.",
      "Evening: 15-minute deep tissue mobility work."
    ]
  })),
  "Mental Health": Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Cognitive Fortification: Day ${i + 1}`,
    description: "Systematic restructuring of mental frameworks for absolute focus.",
    steps: [
      "Morning: 20 minutes of silent Vipassana meditation.",
      "Journaling: Document 3 strategic objectives and potential obstacles.",
      "Deep Work: 4 hours of zero-distraction cognitive output.",
      "Evening: Stoic reflection on the day's performance.",
      "No digital inputs 2 hours before physiological rest."
    ]
  })),
  "Money Saving": Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Capital Preservation: Day ${i + 1}`,
    description: "Aggressive wealth accumulation through extreme frugality and strategic allocation.",
    steps: [
      "Audit: Log every transaction with 100% precision.",
      "Elimination: Identify and terminate one non-essential recurring cost.",
      "Optimization: Research high-yield asset allocation strategies.",
      "Discipline: Zero impulse purchases. 48-hour cooling period for all buys.",
      "Education: Study one chapter of advanced macroeconomics or value investing."
    ]
  })),
  Productivity: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Operational Excellence: Day ${i + 1}`,
    description: "Maximizing output through rigorous time-blocking and elimination of low-value tasks.",
    steps: [
      "Planning: Define the 'One Critical Move' for the next 24 hours.",
      "Execution: 90-minute deep work blocks with zero interruptions.",
      "Communication: Batch all correspondence into two 30-minute windows.",
      "Review: Analyze time-leakage and optimize workflow bottlenecks.",
      "Preparation: Set the environment for tomorrow's peak performance."
    ]
  })),
  "Sleep Improvement": Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    title: `Circadian Optimization: Day ${i + 1}`,
    description: "Scientific calibration of sleep architecture for maximum recovery.",
    steps: [
      "Morning: 10 minutes of direct sunlight exposure within 30 mins of waking.",
      "Daytime: Zero caffeine after 12:00 PM.",
      "Evening: Magnesium glycinate supplementation (consult professional).",
      "Environment: 18°C room temperature, 100% blackout conditions.",
      "Routine: Consistent wake/sleep times with ±15 min variance."
    ]
  })),
};

export const motivationalQuotes = [
  "Discipline is the bridge between goals and accomplishment.",
  "He who has a why to live can bear almost any how.",
  "The pain of discipline is far less than the pain of regret.",
  "Excellence is not an act, but a habit.",
  "Fortitude is the guard and support of the other virtues.",
  "Amor Fati: Love your fate, which is in fact your life.",
  "The impediment to action advances action. What stands in the way becomes the way.",
  "Waste no more time arguing what a good man should be. Be one.",
  "Self-control is the chief element in self-respect, and self-respect is the chief element in courage.",
  "If it is not right do not do it; if it is not true do not say it.",
];
