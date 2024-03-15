'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of the context state
interface LocalityContextState {
  language: Language;
  direction: Direction;
  languageName: LanguageName;
  setLanguage: (language: Language) => void;
}

// Create a context with an undefined initial value but with the shape of LocalityContextState
const LocalityContext = createContext<LocalityContextState | undefined>(undefined);

// Define the type for the props of the provider component
interface LocalityProviderProps {
  children: ReactNode;
}

export type Language = 'en' | 'he'
export type LanguageName = 'English' | 'Hebrew'
export type Direction = 'ltr' | 'rtl'

// Create the provider component
export const LocalityProvider: React.FC<LocalityProviderProps> = ({ children }) => {

  const [language, setLanguage] = useState<Language>('en');
  const [languageName, setLanguageName] = useState<LanguageName>('English');
  const [direction, setDirection] = useState<Direction>('ltr');

  useEffect(() => {
    setDirection(language === 'en' ? 'ltr' : 'rtl')
    setLanguageName(language === 'en' ? 'English' : 'Hebrew')
  }, [language])

  return (
    <LocalityContext.Provider value={{ language, languageName, direction, setLanguage }}>
      {children}
    </LocalityContext.Provider>
  );
};

// Custom hook to use the edit mode context
export const useLocality = (): LocalityContextState => {
  const context = useContext(LocalityContext);
  if (context === undefined) {
    throw new Error('useLocality must be used within an LocalityContext');
  }
  return context;
};
