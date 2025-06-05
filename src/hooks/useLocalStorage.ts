import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  // קריאת הערך מ-localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item, (_, value) => {
        // המרת תאריכים בחזרה לאובייקטי Date
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
          return new Date(value);
        }
        return value;
      }) : initialValue;
    } catch (error) {
      console.log('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // שמירת הערך ב-localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
} 