import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { DafData, StudySession, Statistics } from '../types';
import { getTotalDafim } from '../data/masechet';

export function useDafData() {
  const [dafimData, setDafimData] = useLocalStorage<DafData[]>('dafim-data', []);

  // הוספת לימוד חדש
  const addStudySession = (masechet: string, daf: number, session: Omit<StudySession, 'id'>) => {
    const sessionWithId: StudySession = {
      ...session,
      id: Date.now().toString()
    };

    setDafimData(prevData => {
      const existingDafIndex = prevData.findIndex(
        d => d.masechet === masechet && d.daf === daf
      );

      if (existingDafIndex >= 0) {
        // עדכון דף קיים
        const updatedData = [...prevData];
        const existingDaf = updatedData[existingDafIndex];
        const updatedSessions = [...existingDaf.studySessions, sessionWithId];
        
        updatedData[existingDafIndex] = {
          ...existingDaf,
          studySessions: updatedSessions,
          totalStudies: updatedSessions.length,
          averageUnderstanding: updatedSessions.reduce((sum, s) => sum + s.understanding, 0) / updatedSessions.length,
          lastStudied: session.date
        };
        
        return updatedData;
      } else {
        // הוספת דף חדש
        const newDaf: DafData = {
          id: `${masechet}-${daf}`,
          masechet,
          daf,
          studySessions: [sessionWithId],
          totalStudies: 1,
          averageUnderstanding: session.understanding,
          lastStudied: session.date
        };
        
        return [...prevData, newDaf];
      }
    });
  };

  // מחיקת לימוד
  const deleteStudySession = (masechet: string, daf: number, sessionId: string) => {
    setDafimData(prevData => {
      return prevData.map(dafData => {
        if (dafData.masechet === masechet && dafData.daf === daf) {
          const updatedSessions = dafData.studySessions.filter(s => s.id !== sessionId);
          
          if (updatedSessions.length === 0) {
            return null; // מחיקת הדף כולו
          }
          
          return {
            ...dafData,
            studySessions: updatedSessions,
            totalStudies: updatedSessions.length,
            averageUnderstanding: updatedSessions.reduce((sum, s) => sum + s.understanding, 0) / updatedSessions.length,
            lastStudied: updatedSessions[updatedSessions.length - 1]?.date
          };
        }
        return dafData;
      }).filter(Boolean) as DafData[];
    });
  };

  // קבלת נתונים של דף ספציפי
  const getDafData = (masechet: string, daf: number): DafData | undefined => {
    return dafimData.find(d => d.masechet === masechet && d.daf === daf);
  };

  // קבלת סטטיסטיקות
  const statistics: Statistics = useMemo(() => {
    const totalDafim = getTotalDafim();
    const studiedDafim = dafimData.length;
    const totalStudySessions = dafimData.reduce((sum, daf) => sum + daf.totalStudies, 0);
    
    // חישוב רצף נוכחי
    const sortedByDate = dafimData
      .filter(d => d.lastStudied)
      .sort((a, b) => b.lastStudied!.getTime() - a.lastStudied!.getTime());
    
    let currentStreak = 0;
    let lastDate: Date | null = null;
    
    for (const daf of sortedByDate) {
      if (!daf.lastStudied) break;
      
      if (!lastDate) {
        lastDate = daf.lastStudied;
        currentStreak = 1;
        continue;
      }
      
      const daysDiff = Math.floor((lastDate.getTime() - daf.lastStudied.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff <= 1) {
        currentStreak++;
        lastDate = daf.lastStudied;
      } else {
        break;
      }
    }

    return {
      totalDafim,
      studiedDafim,
      completionPercentage: totalDafim > 0 ? (studiedDafim / totalDafim) * 100 : 0,
      totalStudySessions,
      averageSessionsPerDaf: studiedDafim > 0 ? totalStudySessions / studiedDafim : 0,
      currentStreak,
      longestStreak: currentStreak, // לעכשיו זהה לרצף הנוכחי
      weeklyGoal: 7, // ברירת מחדל
      weeklyProgress: 0 // יחושב לאחר מכן
    };
  }, [dafimData]);

  return {
    dafimData,
    addStudySession,
    deleteStudySession,
    getDafData,
    statistics
  };
} 