export interface StudySession {
  id: string;
  date: Date;
  understanding: number; // 1-5
  timeSpent?: number; // בדקות
  notes?: string;
}

export interface DafData {
  id: string;
  masechet: string;
  daf: number;
  studySessions: StudySession[];
  totalStudies: number;
  averageUnderstanding: number;
  lastStudied?: Date;
  notes?: string;
}

export interface MasechetInfo {
  name: string;
  hebrewName: string;
  totalPages: number;
  order: number;
}

export interface Statistics {
  totalDafim: number;
  studiedDafim: number;
  completionPercentage: number;
  totalStudySessions: number;
  averageSessionsPerDaf: number;
  currentStreak: number;
  longestStreak: number;
  favoriteTime?: string;
  weeklyGoal: number;
  weeklyProgress: number;
}

export interface UserPreferences {
  dailyReminder: boolean;
  reminderTime: string;
  weeklyGoal: number;
  theme: 'light' | 'dark';
  language: 'he' | 'en';
} 