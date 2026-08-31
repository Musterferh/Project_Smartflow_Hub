'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Course } from '@/types';

interface CourseContextType {
  selectedCourses: Course[];
  addCourse: (course: Course) => void;
  removeCourse: (id: string) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
  totalPrice: number;
  totalCount: number;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const STORAGE_KEY = 'smartflow_selected_courses';

export function CourseProvider({ children }: { children: ReactNode }) {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSelectedCourses(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever selection changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCourses));
    }
  }, [selectedCourses, hydrated]);

  const addCourse = useCallback((course: Course) => {
    setSelectedCourses((prev) => {
      if (prev.find((c) => c.id === course.id)) return prev;
      return [...prev, course];
    });
  }, []);

  const removeCourse = useCallback((id: string) => {
    setSelectedCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCourses([]);
  }, []);

  const isSelected = useCallback(
    (id: string) => selectedCourses.some((c) => c.id === id),
    [selectedCourses]
  );

  const totalPrice = selectedCourses.reduce((sum, c) => sum + c.price, 0);
  const totalCount = selectedCourses.length;

  return (
    <CourseContext.Provider
      value={{
        selectedCourses,
        addCourse,
        removeCourse,
        clearSelection,
        isSelected,
        totalPrice,
        totalCount,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error('useCourseContext must be used within CourseProvider');
  return ctx;
}
