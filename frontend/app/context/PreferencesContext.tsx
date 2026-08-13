'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export interface UserPreferences {
  compactLayout: boolean;
  showReadTime: boolean;
  cardsPerRow: 2 | 3 | 4;
}

const defaultPreferences: UserPreferences = {
  compactLayout: false,
  showReadTime: true,
  cardsPerRow: 3,
};

interface PreferencesContextType {
  preferences: UserPreferences;
  setPreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  resetPreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

function normalizeCardsPerRow(value: unknown): 2 | 3 | 4 {
  if (value === 2 || value === 3 || value === 4) {
    return value;
  }
  return 3;
}

function getInitialPreferences(): UserPreferences {
  if (typeof window === 'undefined') {
    return defaultPreferences;
  }

  try {
    const saved = localStorage.getItem('preferences');
    if (!saved) {
      return defaultPreferences;
    }

    const parsed = JSON.parse(saved) as Partial<UserPreferences>;
    return {
      compactLayout: Boolean(parsed.compactLayout),
      showReadTime: parsed.showReadTime !== false,
      cardsPerRow: normalizeCardsPerRow(parsed.cardsPerRow),
    };
  } catch {
    return defaultPreferences;
  }
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    setPreferences(getInitialPreferences());
  }, []);

  useEffect(() => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle('compact-layout', preferences.compactLayout);

    return () => {
      root.classList.remove('compact-layout');
    };
  }, [preferences.compactLayout]);

  const setPreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((current) => ({
      ...current,
      [key]: key === 'cardsPerRow' ? normalizeCardsPerRow(value) : value,
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  const value = useMemo(
    () => ({
      preferences,
      setPreference,
      resetPreferences,
    }),
    [preferences]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}
